import { Flipper } from '@/typings/contracts/Flipper';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractType } from 'devphase';

describe('Flipper', () => {
    let contract : Flipper;
    let signer : KeyringPair;
    let certificate : PhalaSdk.CertificateData;
    
    before(async function() {
        const factory = await this.devPhase.getFactory(
            ContractType.InkCode,
            './contracts/flipper/target/ink/flipper.contract'
        );
        
        await factory.deploy();
        
        contract = await factory.instantiate(
            'new',
            [ true ]
        );
        
        signer = this.devPhase.accounts.alice;
        
        certificate = await PhalaSdk.signCertificate({
            api: this.api,
            pair: signer,
        });
    });
    
    it('Should be created with proper intial value', async function() {
        const response = await contract.query.get(certificate, {});
        
        expect(response.output.toJSON()).to.be.equal(true);
    });
    
    // describe('with flip called', async function () {
    //     before(async function() {
    //         await contract.tx.flip({}).signAndSend(signer);
    //     });
    //
    //     it('Should return opposite value', async function() {
    //         const response = await contract.query.get(certificate, {});
    //
    //         expect(response.output.toJSON()).to.be.equal(false);
    //     });
    // });
});
