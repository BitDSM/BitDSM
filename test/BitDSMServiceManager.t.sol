// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import {BitDSMServiceManager} from "../src/core/BitDSMServiceManager.sol";
import "./mocks/MockBitcoinPod.sol";
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {ECDSAServiceManagerBase} from "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import {ISignatureUtils} from "@eigenlayer/src/contracts/interfaces/ISignatureUtils.sol";
import {IAVSDirectory} from "@eigenlayer/src/contracts/interfaces/IAVSDirectory.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MockBitcoinPodManager} from "./mocks/MockBitcoinPodManager.sol";
contract MockAVSDirectory is IAVSDirectory {
    function registerOperatorToAVS(address, ISignatureUtils.SignatureWithSaltAndExpiry memory) external pure {}
    function deregisterOperatorFromAVS(address) external pure {}
    function updateAVSMetadataURI(string memory) external pure {}
    function OPERATOR_AVS_REGISTRATION_TYPEHASH() external pure returns (bytes32) {
        return bytes32(0);
    }
    function calculateOperatorAVSRegistrationDigestHash(
        address operator,
        address avs,
        bytes32 salt,
        uint256 expiry
    ) external pure returns (bytes32) {
        return bytes32(0);
    }
    function operatorSaltIsSpent(address operator, bytes32 salt) external pure returns (bool) {
        return false;
    }
}

contract MockECDSAStakeRegistry {
    function operatorRegistered(address) external pure returns (bool) {
        return true;
    }
}

contract BitDSMServiceManagerTest is Test {
    using ECDSA for bytes32;
    BitDSMServiceManager public serviceManager;
    address public podAddress;
    MockBitcoinPodManager public podManager;

    MockAVSDirectory public mockAVSDirectory;
    MockECDSAStakeRegistry public mockStakeRegistry;
    
    address public owner;
    address public operator;
    address public manager;
    address public operator2;
    uint256 private operatorPrivateKey;
    bytes public operatorBtcPubKey;
    bytes public bitcoinAddress;
    
    event BitcoinWithdrawalTransactionSigned(address indexed pod, address indexed operator, uint256 amount);
    function deployProxiedServiceManager() internal returns (BitDSMServiceManager) {
    // Deploy ProxyAdmin if not already deployed
    ProxyAdmin proxyAdmin = new ProxyAdmin();
    
    // Deploy implementation
    BitDSMServiceManager impl = new BitDSMServiceManager(
        address(mockAVSDirectory),
        address(mockStakeRegistry),
        address(0), // rewards coordinator
        address(0)  // delegation manager
    );

    // Deploy and initialize proxy in one step
    TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
        address(impl),
        address(proxyAdmin),
        abi.encodeWithSelector(
            BitDSMServiceManager.initialize.selector,
            owner,
            address(0), // middleware utils
            address(podManager)
        )
    );

    return BitDSMServiceManager(address(proxy));
}

    
    function setUp() public {
        owner = address(this);
        operatorPrivateKey = 0x1; // This is the private key for operator1
        operator = vm.addr(operatorPrivateKey);
        operator2 = address(0x2);

        // Mock Bitcoin-related data
        operatorBtcPubKey = hex"02abc123"; // Example public key
        bitcoinAddress = hex"1234567890"; // Example Bitcoin address

        mockAVSDirectory = new MockAVSDirectory();
        mockStakeRegistry = new MockECDSAStakeRegistry();

        // First create the pod manager with a temporary address
        podManager = new MockBitcoinPodManager(address(1)); // temporary address

        
       
        serviceManager = deployProxiedServiceManager();
        
        podManager.updateServiceManager(address(serviceManager));

        // Create pod
        vm.prank(owner);
        podAddress = podManager.createPod(operator, bitcoinAddress);
    }

    function testConfirmDeposit() public {
        // 1. Create a deposit request
        bytes32 txId = bytes32("example_tx_id");
        uint256 amount = 1;
        
        // Add verification that operator is registered
        assertTrue(mockStakeRegistry.operatorRegistered(operator), "Operator not registered");
        
        // Create deposit request through pod manager
        vm.prank(owner);
        podManager.verifyBitcoinDepositRequest(
            podAddress,
            txId,
            amount
        );

        // Verify deposit request was created successfully
       bool requestPending = podManager.getBitcoinDepositRequest(podAddress).isPending;
        assertTrue(requestPending, "Deposit request not pending");

        // Create deposit confirmation message
        bytes32 messageHash = keccak256(abi.encodePacked(
            podAddress,
            operator,
            amount,
            txId,
            true
        ));
         bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // // Sign message with operator's private key
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(operatorPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // // Verify signature is valid
        address recoveredSigner = ethSignedMessageHash.recover(signature);
        assertEq(recoveredSigner, operator, "Invalid signature recovery");

        // // Confirm deposit as operator
        vm.prank(operator);
        serviceManager.confirmDeposit(podAddress, signature);
        
        // // Assert pod state changes
        assertEq(IBitcoinPod(podAddress).getBitcoinBalance(), amount);
    }

    function testWithdrawBitcoinPSBT() public {
        uint256 amount = 1;
        bytes memory withdrawAddress = hex"0200000001"; // Example withdraw address
        bytes memory psbtTx = hex"0200000003"; // Example psbt transaction
        
        // client send the psbt to the BitcoinPodManager to create a withdrawal request
        vm.prank(owner);
        podManager.withdrawBitcoinPSBTRequest(podAddress, withdrawAddress);

        // Create PSBT signature message
        bytes32 messageHash = keccak256(abi.encodePacked(
            podAddress,
            amount,
            psbtTx,
            withdrawAddress
        ));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // Sign message
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(operatorPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Submit PSBT as operator
        vm.prank(operator);
        vm.expectEmit(true, true, false, true);
        emit BitcoinWithdrawalTransactionSigned(podAddress, operator, amount);

        serviceManager.withdrawBitcoinPSBT(podAddress, amount, psbtTx, signature);
       
    }
    
    function testWithdrawBitcoinCompleteTx() public {
        uint256 amount = 1;
        bytes memory withdrawAddress = hex"0200000001"; // Example withdraw address
        bytes memory completeTx = hex"0200000003"; // Example complete transaction
        
        // client send the request to the BitcoinPodManager to create a withdrawal request
        vm.prank(owner);
        podManager.withdrawBitcoinCompleteTxRequest(podAddress, completeTx, withdrawAddress);
        
        // Create complete tx signature message
        bytes32 messageHash = keccak256(abi.encodePacked(
            podAddress,
            amount,
            completeTx,
            withdrawAddress
        ));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // Sign message
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(operatorPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Submit complete transaction as operator
        vm.prank(operator);
        vm.expectEmit(true, true, false, true);
        emit BitcoinWithdrawalTransactionSigned(podAddress, operator, amount);
        serviceManager.withdrawBitcoinCompleteTx(podAddress, amount, completeTx, signature);
    }

    function testConfirmWithdrawal() public {
        bytes memory transaction = hex"0200000001"; // Example Bitcoin transaction
        // create mock withdrawal address
        bytes memory withdrawAddress = hex"0200000001"; // Example withdraw address
        // create a withdrawal request through pod manager
        vm.prank(owner);
        podManager.withdrawBitcoinCompleteTxRequest(podAddress, transaction, withdrawAddress);
        // Create withdrawal confirmation message
        bytes32 messageHash = keccak256(abi.encodePacked(
            podAddress,
            transaction,
            withdrawAddress
        ));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // Sign message
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(operatorPrivateKey, ethSignedMessageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Confirm withdrawal as operator
        vm.prank(operator);
        serviceManager.confirmWithdrawal(podAddress, transaction, signature);

        // Assert pod state changes
        assertEq(IBitcoinPod(podAddress).getBitcoinBalance(), 0);
    }


    function testFailConfirmDepositUnauthorized() public {
        bytes memory signature = new bytes(65);
        
        // Try to confirm deposit from unauthorized address
        vm.prank(address(0xbad));
        vm.expectRevert("Unauthorized operator");
        serviceManager.confirmDeposit(podAddress, signature);
    }

    function testFailWithdrawBitcoinPSBTInvalidSignature() public {
        uint256 amount = 1 ether;
        bytes memory psbtTx = hex"0200000001";
        bytes memory invalidSignature = new bytes(65);

        vm.prank(operator);
        vm.expectRevert("Invalid signature");
        serviceManager.withdrawBitcoinPSBT(podAddress, amount, psbtTx, invalidSignature);
    }

    function testFailWithdrawBitcoinCompleteTxUnauthorized() public {
        uint256 amount = 1;
        
        bytes memory completeTx = hex"0200000001";
        bytes memory signature = new bytes(65);

        vm.prank(address(0xbad));
        vm.expectRevert("Unauthorized operator");
        serviceManager.withdrawBitcoinCompleteTx(podAddress, amount, completeTx, signature);
    }

    function testFailConfirmWithdrawalInvalidTransaction() public {
        bytes memory invalidTx = new bytes(0);
        bytes memory signature = new bytes(65);

        vm.prank(operator);
        vm.expectRevert("Invalid transaction");
        serviceManager.confirmWithdrawal(podAddress, invalidTx, signature);
    }
}





