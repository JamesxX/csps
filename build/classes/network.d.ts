/// <reference types="node" />
import ppkp from "./ppkp";
export interface signedDirectionalPacket {
    to: network_user;
    from: network_user;
    data: Buffer;
    signature: Buffer;
}
export declare class signedDirectionalPacket {
    toBuffer(): Buffer;
    static fromBuffer(packet: Buffer): signedDirectionalPacket;
}
export declare type unsignedDirectionalPacket = Omit<signedDirectionalPacket, 'signature'>;
export declare class network_user extends ppkp {
    get id(): Buffer;
    protected signedDirectionalPacket(packet: unsignedDirectionalPacket): signedDirectionalPacket;
    verifySignedDirectionalPacket(packet: signedDirectionalPacket): boolean;
}
export default class network {
    protected users: Map<Buffer, network_user>;
    addUser(user: network_user): void;
    verifySignedDirectionalPacket(packet: signedDirectionalPacket): boolean;
}
