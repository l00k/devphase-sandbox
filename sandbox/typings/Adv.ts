import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "devphase";
import type * as DPT from "devphase/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";

export namespace Adv {
    type ink_primitives$Key = any;
    type ink_storage$lazy$mapping$Mapping = { offset_key: ink_primitives$Key };
    type adv$flipper$User = { active: boolean, name: string, role: any, age: number, salery: number, favorite_numbers: number[] };
    type ink_env$types$AccountId = any;

    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Get extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<any>>;
        }
    }

    export interface MapMessageQuery extends DPT.MapMessageQuery {
        get: ContractQuery.Get;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
        export interface Add extends DPT.ContractTx {
            (options: ContractOptions, user: adv$flipper$User): DPT.SubmittableExtrinsic;
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
