import { Flipper } from '@/typings/Flipper';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractType } from 'devphase';


describe('Flipper', () => {
    let factory : Flipper.Factory;
    let contract : Flipper.Contract;
    let signer : KeyringPair;
    let certificate : PhalaSdk.CertificateData;
    
    before(async function() {
        factory = await this.devPhase.getFactory(
            ContractType.InkCode,
            './contracts/flipper/target/ink/flipper.contract'
        );
        
        await factory.deploy();
        
        signer = this.devPhase.accounts.alice;
        certificate = await PhalaSdk.signCertificate({
            api: this.api,
            pair: signer,
        });
    });
    
    describe('default constructor', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(certificate, {});
            
            expect(response.output.toJSON()).to.be.equal(false);
        });
    });
    
    describe('new constructor', () => {
        before(async function() {
            contract = await factory.instantiate('new', [ true ]);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(certificate, {});
            
            expect(response.output.toJSON()).to.be.equal(true);
        });
    });
    
    
    // describe('constructed', () => {
    //     before(async function() {
    //         contract = await factory.instantiate('new', [ false ]);
    //     });
    //
    //     it('Should be possible to set explict value', async function() {
    //         await contract.tx.set({}, true).signAndSend(signer);
    //         // todo ld 2022-10-31 13:26:38 -wait here
    //     });
    // });
    
    
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
