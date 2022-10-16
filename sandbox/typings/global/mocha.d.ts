import { DevPhase } from 'devphase';
import { ApiPromise } from '@polkadot/api';

declare module 'mocha'
{
    export interface Context
    {
        devPhase : DevPhase;
        api : ApiPromise;
    }
}
