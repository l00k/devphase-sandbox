import { AdvCases } from '@/typings/AdvCases';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractType } from 'devphase';


describe('Adv', () => {
    let factory : AdvCases.Factory;
    let contract : AdvCases.Contract;
    let signer : KeyringPair;
    let certificate : PhalaSdk.CertificateData;
    
    before(async function() {
        factory = await this.devPhase.getFactory(
            ContractType.InkCode,
            './contracts/adv/target/ink/adv.contract'
        );
        
        await factory.deploy();
        
        signer = this.devPhase.accounts.bob;
        certificate = await PhalaSdk.signCertificate({
            api: this.api,
            pair: signer,
        });
    });
    
    describe('constructed', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(certificate, {}, 0);
            
            expect(response.output.toJSON()).to.be.equal(false);
        });
        
        it('Should be able to create new entry', async function() {
            const extrinsic = await contract.tx.add({}, {
                active: true,
                age: 10,
                favorite_numbers: [ 10, 12 ],
                name: 'Sample',
                role: 'User',
                salery: 10000,
            });
            
            await extrinsic.signAndSend(signer);
        });
    });
    
});
