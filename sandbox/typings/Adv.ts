import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "devphase";
import type * as DPT from "devphase/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";

export namespace Adv {
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
            (options: ContractOptions, user: { active: boolean, name: string, role: any, age: number, salery: number, favorite_numbers: number[] }): DPT.SubmittableExtrinsic;
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
