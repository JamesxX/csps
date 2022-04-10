/// <reference types="node" />
import crypto from 'crypto';
export default class ppkp {
    publicKey: crypto.KeyObject;
    private privateKey?;
    constructor(publicKey?: crypto.KeyObject, privateKey?: crypto.KeyObject);
    sign(data: Buffer): Buffer;
    verify(data: Buffer, signature: Buffer): boolean;
    protected get publicKeyBuffer(): Buffer;
    protected get privateKeyBuffer(): Buffer;
}
