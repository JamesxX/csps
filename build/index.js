"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ppkp_1 = __importDefault(require("./classes/ppkp"));
const pair = new ppkp_1.default();
console.log(pair.publicKey.export({
    type: 'pkcs1',
    format: "der"
}));
