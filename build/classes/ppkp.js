"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class ppkp {
    constructor(publicKey, privateKey) {
        // If public key is undefiend, neither are defined
        if (publicKey == undefined) {
            const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync("rsa", {
                modulusLength: 2048
            });
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }
        else {
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }
    }
    ;
    sign(data) {
        if (this.privateKey == undefined) {
            throw new Error("Attempting to sign data with undefined private key");
        }
        return crypto_1.default.sign("sha256", data, {
            key: this.privateKey,
            padding: crypto_1.default.constants.RSA_PKCS1_PSS_PADDING
        });
    }
    verify(data, signature) {
        return crypto_1.default.verify("sha256", data, {
            key: this.publicKey,
            padding: crypto_1.default.constants.RSA_PKCS1_PSS_PADDING
        }, signature);
    }
    get publicKeyBuffer() {
        return this.publicKey.export({
            type: 'pkcs1',
            format: "der"
        });
    }
    get privateKeyBuffer() {
        if (this.privateKey == undefined) {
            throw new Error("Attempting to export undefined private key");
        }
        return this.privateKey.export({
            type: 'pkcs1',
            format: "der"
        });
    }
}
exports.default = ppkp;
