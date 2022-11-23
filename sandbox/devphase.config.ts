import type { ProjectConfigOptions } from 'devphase';
import { DevPhase } from 'devphase';

const config : ProjectConfigOptions = {
    stack: {
        blockTime: 1000,
    },
    testing: {
        blockTime: 100,
        envSetup: {
            setup: {
                custom: async (devPhase : DevPhase) => {
                    await devPhase.stackSetup();
                    console.log('Using default env setup done');
                },
            }
        }
    }
};

export default config;
