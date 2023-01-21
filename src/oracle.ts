
import * as CryptoJS from "crypto-js";

import * as enc from "./encoding";
import * as aes from "./aes";
import {ByteArray, BA} from "./bytearray";


const gen16byteKey = (): ByteArray => {
    return ByteArray.fromWordArray(CryptoJS.lib.WordArray.random(16));
}

const addRandomPadding = (inb: ByteArray): ByteArray => {
    const pickNum5to10 = () => Math.floor(Math.random()*5) + 5;
    const arrayForLen = (len: number): number[] => new Array(len).fill(0);

    const preBytes = arrayForLen(pickNum5to10());
    const postBytes = arrayForLen(pickNum5to10());


    return ByteArray.from(preBytes.concat(inb).concat(postBytes));
}

const randomEncrypt = (plaintext: ByteArray) => {
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
    const input = ByteArray.fromBytes(Array(16*4).fill(13));

    const result = randomEncrypt(input);

    const blocks = enc.chunkArr(result.encrypted, 16);
    const isEcb = blocks[1].toString() ==  blocks[2].toString();

    const modeGuess = (isEcb) ? "ecb" : "cbc";


    // To detect if its ecb vs. cbc, check that... something about XOR?

    return {modeGuess, blocks, ...result};
}

export {oracle, randomEncrypt, addRandomPadding}