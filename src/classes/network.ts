import { assert } from "console";
import ppkp from "./ppkp";

export interface signedDirectionalPacket{
    to: network_user,
    from: network_user,
    data: Buffer,
    signature: Buffer;
}

export class signedDirectionalPacket{
    public toBuffer() : Buffer{
        return Buffer.from(JSON.stringify(this))
    }

    static fromBuffer(packet: Buffer): signedDirectionalPacket{
        const object : signedDirectionalPacket = <signedDirectionalPacket>JSON.parse(packet.toString())
        assert(object.to)
        assert(object.from)
        assert(object.data)
        assert(object.signature)
        return object;
    }
}

export type unsignedDirectionalPacket = Omit<signedDirectionalPacket, 'signature'>

export class network_user extends ppkp{

    // Alias
    public get id() : Buffer { return this.publicKeyBuffer }

    protected signedDirectionalPacket(packet: unsignedDirectionalPacket): signedDirectionalPacket{
        let signedPacket = <signedDirectionalPacket>packet;
        signedPacket.signature = this.sign( Buffer.concat([
            packet.to.publicKeyBuffer,
            packet.from.publicKeyBuffer,
            packet.data
        ]))
        return signedPacket;
    }

    public verifySignedDirectionalPacket(packet: signedDirectionalPacket) : boolean{
        return this.verify(
            Buffer.concat([
                packet.to.publicKeyBuffer,
                packet.from.publicKeyBuffer,
                packet.data
            ]),
            packet.signature
        )
    }

}

export default class network {
    
    protected users: Map< Buffer, network_user> = new Map< Buffer, network_user>();

    public addUser(user: network_user){
        this.users.set(user.id, user)
    }

    public verifySignedDirectionalPacket(packet: signedDirectionalPacket) : boolean{
        if ( !this.users.has(packet.from.id) || !this.users.has(packet.to.id) ) return false;
        return this.users.get(packet.from.id)!.verifySignedDirectionalPacket(packet)
    }

}