import type { ProjectConfigOptions } from 'devphase';
import { DevPhase } from 'devphase/dist';

const config : ProjectConfigOptions = {
    testing: {
        blockTime: 250,
        spawnStack: false,
        stackLogOutput: true,
        envSetup: {
            setup: {
                custom: async (devPhase : DevPhase) => {
                    await devPhase.defaultEnvSetup();
                    console.log('Using default env setup done');
                },
            }
        }
    }
};

export default config;
