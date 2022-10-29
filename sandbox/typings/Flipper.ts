import * as DevPhase from "devphase";

export namespace Flipper {
    export interface MapMessageQuery extends DevPhase.MapMessageQuery {
        get: DevPhase.ContractQuery;
    }

    export interface MapMessageTx extends DevPhase.MapMessageTx {
        flip: DevPhase.ContractTx;
    }

    export declare class Contract extends DevPhase.Contract {
        get query(): MapMessageQuery;
        get tx(): MapMessageTx;
    }

    export declare class Factory extends DevPhase.ContractFactory {
        instantiate<T = Contract>(constructor: "new", params: [boolean], options?: DevPhase.InstantiateOptions): Promise<T>;
        instantiate<T = Contract>(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<T>;
    }
}
