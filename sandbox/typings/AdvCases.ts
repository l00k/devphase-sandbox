import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "devphase";
import type * as DPT from "devphase/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";

export namespace AdvCases {
    type InkPrimitives_Key = any;
    type InkStorage_Lazy_Mapping_Mapping = { offset_key: InkPrimitives_Key };
    type AdvCases_AdvCases_User = { active: boolean, name: string, role: any, age: number, salery: number, favorite_numbers: number[] };
    type InkEnv_Types_AccountId = any;

    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetUser extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<DPT.IJson<AdvCases_AdvCases_User>>>;
        }

        export interface GetUserByResult extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<any>>;
        }

        export interface GetArray extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, text: string): DPT.CallResult<DPT.CallOutcome<DPT.IVec<DPT.INumber>>>;
        }

        export interface GetTuple extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, text: string): DPT.CallResult<DPT.CallOutcome<DPT.ITuple<[ DPT.INumber, DPT.IText ]>>>;
        }
    }

    export interface MapMessageQuery extends DPT.MapMessageQuery {
        getUser: ContractQuery.GetUser;
        getUserByResult: ContractQuery.GetUserByResult;
        getArray: ContractQuery.GetArray;
        getTuple: ContractQuery.GetTuple;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
        export interface Add extends DPT.ContractTx {
            (options: ContractOptions, user: AdvCases_AdvCases_User): DPT.SubmittableExtrinsic;
        }
    }

    export interface MapMessageTx extends DPT.MapMessageTx {
        add: ContractTx.Add;
    }

    /** */
    /** Contract */
    /** */
    export declare class Contract extends DPT.Contract {
        get query(): MapMessageQuery;
        get tx(): MapMessageTx;
    }

    /** */
    /** Contract factory */
    /** */
    export declare class Factory extends DevPhase.ContractFactory {
        instantiate<T = Contract>(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<T>;
    }
}
