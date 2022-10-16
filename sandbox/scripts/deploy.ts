import { ContractType, DevPhase } from 'devphase';
import { Flipper } from '@/typings/contracts/Flipper';
import * as PhalaSdk from '@phala/sdk';
import fs from 'fs';


(async() => {
    // setup
    console.log('### Setup');
    
    const devPhase : DevPhase = await DevPhase.setup({
    
    });
    const { api } = devPhase;
    
    const factory = await devPhase.getFactory(
        ContractType.InkCode,
        './contract/target/ink/flipper.contract'
    );
    
    // deploy
    console.log('### Deploy');
    
    await factory.deploy();
    
    // instantiate
    console.log('### Instantiate');
    
    const contract : Flipper = <any> await factory.instantiate(
        'new',
        [ true ]
    );
    
    // testing
    console.log('### Testing');
    
    const signer = devPhase.accounts.alice;
    const certificate = await PhalaSdk.signCertificate({
        api,
        pair: signer,
    });
    
    const response = await contract.query.get(certificate, {});
    console.debug({
        debugMessage: response.debugMessage.toJSON(),
        gasConsumed: response.gasConsumed.toJSON(),
        output: response.output.toJSON(),
        result: response.result.toJSON(),
        storageDeposit: response.storageDeposit.toJSON(),
    });
    
    // cleanup
    console.log('### Cleanup');
    await devPhase.cleanup();
})();
