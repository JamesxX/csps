import crypto from 'crypto'

export default class ppkp{
    public publicKey: crypto.KeyObject;
    private privateKey?: crypto.KeyObject;

    constructor( publicKey?: crypto.KeyObject, privateKey?: crypto.KeyObject ){
        // If public key is undefiend, neither are defined
        if ( publicKey == undefined ){
            const {publicKey, privateKey} = crypto.generateKeyPairSync( "rsa", {
                modulusLength: 2048
            })
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        } else {
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }
    };

    public sign(data: Buffer): Buffer{
        if ( this.privateKey == undefined ){
            throw new Error("Attempting to sign data with undefined private key");
        }
        return crypto.sign(
            "sha256",
            data,
            {
                key: this.privateKey!,
                padding: crypto.constants.RSA_PKCS1_PSS_PADDING
            }
        )
    }

    public verify(data: Buffer, signature: Buffer): boolean{
        return crypto.verify(
            "sha256",
            data,
            {
                key: this.publicKey,
                padding: crypto.constants.RSA_PKCS1_PSS_PADDING
            },
            signature
        )
    }

    public get publicKeyBuffer() : Buffer {
        return this.publicKey.export({
            type: 'pkcs1',
            format: "der"
        });
    }

    public get privateKeyBuffer() : Buffer {
        if ( this.privateKey == undefined ){
            throw new Error("Attempting to export undefined private key");
        }
        return this.privateKey!.export({
            type: 'pkcs1',
            format: "der"
        });
    }
}