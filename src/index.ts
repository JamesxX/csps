import action from "./classes/action";
import network, { network_user, signedDirectionalPacket } from "./classes/network";

export default class csps extends network{

    constructor( protected root: network_user ){ super() }

    public verifyGrantFromRoot( token: signedDirectionalPacket, action: action ){
        if (!this.verifySignedDirectionalPacket(token)){ return false; }
        return token.from == this.root && token.data == Buffer.from(action.delegate)
    }

    public verifyDelegatePermission( token: signedDirectionalPacket, action: action ){
        if (!this.verifySignedDirectionalPacket(token)){ return false; }
        return ( token.from == this.root && token.data == Buffer.from(action.delegate))
    }

    public verifyPermission( token: signedDirectionalPacket, action: action) : boolean {

        if (!this.verifySignedDirectionalPacket(token)){ return false; }

        // First order of business, is this from root?
        if ( token.from == this.root ){
            if ( this.verifyGrantFromRoot(token, action)) return true;
        } else { 

            const inner = signedDirectionalPacket.fromBuffer(token.data);
            if ( inner.to != token.from ) return false;

            if ( inner.from == this.root ){
                if ( this.verifyGrantFromRoot(inner, action)) return true;
            } else{
                const inner2 = signedDirectionalPacket.fromBuffer(inner.data);
                if ( inner2.to != inner.from ) return false;
                if ( this.verifyDelegatePermission(inner2, action)) return true;
            }
        }
        return false;
    }

}