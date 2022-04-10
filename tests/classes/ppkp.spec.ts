import ppkp from '../../src/classes/ppkp';
import {expect} from 'chai';

describe( 'Public/Private key pair class', () => {
    it('should generate a new pair when not provided one', ()=>{
        const pair = new ppkp();
        expect(pair.publicKeyBuffer).to.be.instanceof(Buffer)
        expect(pair.privateKeyBuffer).to.be.instanceof(Buffer)
    })
})