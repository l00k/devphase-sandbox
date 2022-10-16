import { ContractQuery, ContractTx, MapMessageQuery, MapMessageTx, PhatContract } from 'devphase';
import { ApiTypes } from '@polkadot/api/types';


interface Flipper_MapMessageQuery
    extends MapMessageQuery
{
    get : ContractQuery;
}

interface Flipper_MapMessageTx
    extends MapMessageTx
{
    flip : ContractTx;
}

export declare class Flipper
    extends PhatContract
{
    get query () : Flipper_MapMessageQuery;
    get tx () : Flipper_MapMessageTx;
}
