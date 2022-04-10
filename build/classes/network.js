"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.network_user = exports.signedDirectionalPacket = void 0;
const ppkp_1 = __importDefault(require("./ppkp"));
class signedDirectionalPacket {
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
    static fromBuffer(packet) {
        // No checking for correct type here, needs work!
        return JSON.parse(packet.toString());
    }
}
exports.signedDirectionalPacket = signedDirectionalPacket;
class network_user extends ppkp_1.default {
    // Alias
    get id() { return this.publicKeyBuffer; }
    signedDirectionalPacket(packet) {
        let signedPacket = packet;
        signedPacket.signature = this.sign(Buffer.concat([
            packet.to.publicKeyBuffer,
            packet.from.publicKeyBuffer,
            packet.data
        ]));
        return signedPacket;
    }
    verifySignedDirectionalPacket(packet) {
        return this.verify(Buffer.concat([
            packet.to.publicKeyBuffer,
            packet.from.publicKeyBuffer,
            packet.data
        ]), packet.signature);
    }
}
exports.network_user = network_user;
class network {
    constructor() {
        this.users = new Map();
    }
    addUser(user) {
        this.users.set(user.id, user);
    }
    verifySignedDirectionalPacket(packet) {
        if (!this.users.has(packet.from.id) || !this.users.has(packet.to.id))
            return false;
        return this.users.get(packet.from.id).verifySignedDirectionalPacket(packet);
    }
}
exports.default = network;
