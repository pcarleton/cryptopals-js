
import * as CryptoJS from "crypto-js";

import * as enc from "./encoding";
import * as aes from "./aes";



const gen16byteKey = (): enc.ByteArray => {
    return enc.ByteArray.fromWordArray(CryptoJS.lib.WordArray.random(16));
}

const addRandomPadding = (inb: enc.ByteArray): enc.ByteArray => {
    const pickNum5to10 = () => Math.floor(Math.random()*5) + 5;
    const arrayForLen = (len: number) => new Array(len).fill(0);

    const preBytes = arrayForLen(pickNum5to10());
    const postBytes = arrayForLen(pickNum5to10());


    return new enc.ByteArray(preBytes.concat(inb.bytes).concat(postBytes));
}

const randomEncrypt = (plaintext: enc.ByteArray) => {
    const mode = (Math.random() > 0.5) ? "ecb" : "cbc";
  
    const padded = addRandomPadding(plaintext);
  
    const key = gen16byteKey();
  
    if (mode == "ecb") {
      return {mode, encrypted: aes.encryptAes128Ecb(padded, key)};
    } else {
      const iv = gen16byteKey();
      return {mode, encrypted: aes.encryptAes128Cbc(padded, iv, key)};
    }
  }


const oracle = () => {

    // A bunch of the same value, if we see subsequent matching blocks, we can tell its ECB.
    const input = enc.ByteArray.fromBytes(Array(16*4).fill(13));

    const result = randomEncrypt(input);

    const blocks = enc.chunkArr(result.encrypted.bytes, 16);
    const isEcb = blocks[1].toString() ==  blocks[2].toString();

    const modeGuess = (isEcb) ? "ecd" : "cbc";


    // To detect if its ecb vs. cbc, check that... something about XOR?

    return {modeGuess, blocks, ...result};
}

export {oracle, randomEncrypt, addRandomPadding}