/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface AppRegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "appSaltIsSpent"
      | "appStatus"
      | "calculateAppRegistrationDigestHash"
      | "cancelSalt"
      | "deregisterApp"
      | "initialize"
      | "isAppRegistered"
      | "owner"
      | "pause"
      | "paused"
      | "registerApp"
      | "renounceOwnership"
      | "transferOwnership"
      | "unpause"
      | "updateAppMetadataURI"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AppMetadataURIUpdated"
      | "AppRegistrationStatusUpdated"
      | "Initialized"
      | "OwnershipTransferred"
      | "Paused"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "appSaltIsSpent",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "appStatus",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateAppRegistrationDigestHash",
    values: [AddressLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSalt",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deregisterApp",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isAppRegistered",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerApp",
    values: [AddressLike, BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateAppMetadataURI",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "appSaltIsSpent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "appStatus", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateAppRegistrationDigestHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cancelSalt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deregisterApp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAppRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerApp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateAppMetadataURI",
    data: BytesLike
  ): Result;
}

export namespace AppMetadataURIUpdatedEvent {
  export type InputTuple = [app: AddressLike, metadataURI: string];
  export type OutputTuple = [app: string, metadataURI: string];
  export interface OutputObject {
    app: string;
    metadataURI: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AppRegistrationStatusUpdatedEvent {
  export type InputTuple = [app: AddressLike, status: BigNumberish];
  export type OutputTuple = [app: string, status: bigint];
  export interface OutputObject {
    app: string;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AppRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): AppRegistry;
  waitForDeployment(): Promise<this>;

  interface: AppRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  appSaltIsSpent: TypedContractMethod<
    [arg0: AddressLike, arg1: BytesLike],
    [boolean],
    "view"
  >;

  appStatus: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  calculateAppRegistrationDigestHash: TypedContractMethod<
    [app: AddressLike, salt: BytesLike, expiry: BigNumberish],
    [string],
    "view"
  >;

  cancelSalt: TypedContractMethod<[salt: BytesLike], [void], "nonpayable">;

  deregisterApp: TypedContractMethod<[app: AddressLike], [void], "nonpayable">;

  initialize: TypedContractMethod<
    [initialOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  isAppRegistered: TypedContractMethod<[app: AddressLike], [boolean], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  registerApp: TypedContractMethod<
    [
      app: AddressLike,
      signature: BytesLike,
      salt: BytesLike,
      expiry: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  updateAppMetadataURI: TypedContractMethod<
    [metadataURI: string],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "appSaltIsSpent"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "appStatus"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "calculateAppRegistrationDigestHash"
  ): TypedContractMethod<
    [app: AddressLike, salt: BytesLike, expiry: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "cancelSalt"
  ): TypedContractMethod<[salt: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deregisterApp"
  ): TypedContractMethod<[app: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[initialOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isAppRegistered"
  ): TypedContractMethod<[app: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "registerApp"
  ): TypedContractMethod<
    [
      app: AddressLike,
      signature: BytesLike,
      salt: BytesLike,
      expiry: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateAppMetadataURI"
  ): TypedContractMethod<[metadataURI: string], [void], "nonpayable">;

  getEvent(
    key: "AppMetadataURIUpdated"
  ): TypedContractEvent<
    AppMetadataURIUpdatedEvent.InputTuple,
    AppMetadataURIUpdatedEvent.OutputTuple,
    AppMetadataURIUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "AppRegistrationStatusUpdated"
  ): TypedContractEvent<
    AppRegistrationStatusUpdatedEvent.InputTuple,
    AppRegistrationStatusUpdatedEvent.OutputTuple,
    AppRegistrationStatusUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "AppMetadataURIUpdated(address,string)": TypedContractEvent<
      AppMetadataURIUpdatedEvent.InputTuple,
      AppMetadataURIUpdatedEvent.OutputTuple,
      AppMetadataURIUpdatedEvent.OutputObject
    >;
    AppMetadataURIUpdated: TypedContractEvent<
      AppMetadataURIUpdatedEvent.InputTuple,
      AppMetadataURIUpdatedEvent.OutputTuple,
      AppMetadataURIUpdatedEvent.OutputObject
    >;

    "AppRegistrationStatusUpdated(address,uint8)": TypedContractEvent<
      AppRegistrationStatusUpdatedEvent.InputTuple,
      AppRegistrationStatusUpdatedEvent.OutputTuple,
      AppRegistrationStatusUpdatedEvent.OutputObject
    >;
    AppRegistrationStatusUpdated: TypedContractEvent<
      AppRegistrationStatusUpdatedEvent.InputTuple,
      AppRegistrationStatusUpdatedEvent.OutputTuple,
      AppRegistrationStatusUpdatedEvent.OutputObject
    >;

    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}