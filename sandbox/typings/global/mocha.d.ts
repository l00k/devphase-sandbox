import { DevPhase } from '@devphase/core';
import { ApiPromise } from '@polkadot/api';

declare module 'mocha'
{
    export interface Context
    {
        devPhase : DevPhase;
        api : ApiPromise;
    }
}
