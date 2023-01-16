
import * as CryptoJS from "crypto-js";

import * as lib from "./encoding";

const decryptAes128EcbStr = (cipher: string, key: string) => {
    const encKey =  CryptoJS.enc.Utf8.parse(key);
  
    // The challenge input includes newlines, but we want to ignore them.
    // It's a PEM like encoding
    const fixedCipher = cipher.replaceAll("\n", "");
  
    return CryptoJS.AES.decrypt(fixedCipher, encKey, {mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8)
}

const decryptAes128Ecb = (cipher: lib.ByteArray, key: lib.ByteArray): lib.ByteArray => {  
    const words = CryptoJS.AES.decrypt(cipher.tob64(), key.toWordArray(), {mode: CryptoJS.mode.ECB });

    return lib.ByteArray.fromWordArray(words);
}

const encryptAes128EcbStr = (plaintext: string, key: string) => {
    const encKey =  CryptoJS.enc.Utf8.parse(key);
  
    return CryptoJS.enc.Base64.stringify(CryptoJS.AES.encrypt(plaintext, encKey, {mode: CryptoJS.mode.ECB }).ciphertext)
}

const encryptAes128Ecb = (plaintext: lib.ByteArray, key: lib.ByteArray): lib.ByteArray => {  
    return lib.ByteArray.fromWordArray(CryptoJS.AES.encrypt(plaintext.toString(), key.toWordArray(), {mode: CryptoJS.mode.ECB }).ciphertext)
}



const padBlock = (arr: any[], targetLen: number) => {
    const diff = targetLen - (arr.length % targetLen);

    const extraBytes = Array(diff).fill(0).map(() => diff);

    return arr.concat(extraBytes);
}

const dePad = (arr, size) => {
    const lastIdx = arr.length - 1
    const last = arr[lastIdx];
  
    if (last > size || arr.length < size) {
      return arr;
    }
  
    for (let i = 1; i < last; i += 1) {
      if (arr[lastIdx - i] != last) {
        return arr;
      }
    }
  
    // If we've gotten through that, we know we have a padded block, so we can truncate it.
    return arr.slice(0, arr.length - last);
  }


const encryptAes128Cbc = (plaintext: lib.ByteArray, iv: lib.ByteArray, key: lib.ByteArray): lib.ByteArray => {
    const BLOCK_SIZE = 16;
    
    // first start with IV, XOR it with cipher text
    const ptBytes = plaintext.bytes;
  
    //return encKey;
  
      // Pad it
    const padded = padBlock(ptBytes, BLOCK_SIZE);
  
    // Split it into blocks
    const blocks = lib.chunkArr(padded, BLOCK_SIZE).map(lib.ByteArray.fromBytes);
  
    const xorZip = (a1: lib.ByteArray, a2: lib.ByteArray): lib.ByteArray => {
      return lib.ByteArray.fromBytes(a1.bytes.map((d: number, i: number) => d ^ a2.bytes[i]));
    };
  
    let lastBlock = iv;
    let results = [];
    for (let i = 0; i < blocks.length; i += 1) {
      let prepped = xorZip(blocks[i], lastBlock);
      let words = prepped.toWordArray();

      let cipher = CryptoJS.AES.encrypt(words, key.toWordArray(), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding,
      }).ciphertext;

      let cipherBs = lib.ByteArray.fromWordArray(cipher);

      results.push(cipherBs.bytes);
      lastBlock = cipherBs;
    }
    
    // count IV as "block -1"
    // XOR block against block -1, then encrypt it.
    // concat the blocks together again
    // return base64 encoded
  
    return new lib.ByteArray(results.flat());
  }

const decryptAes128Cbc = (cipher, iv, key) => {
    const BLOCK_SIZE = 16;
    
    // first start with IV, XOR it with cipher text
    //const ptBytes = lib.stob(plaintext)
    const encKey = CryptoJS.enc.Utf8.parse(key);
    
    // Split it into blocks
    const blocks = lib.chunkArr(lib.fromb64(cipher), BLOCK_SIZE);
  
    const xorZip = (a1, a2) => {
      return a1.map((d, i) => d ^ a2[i]);
    };
  
    let lastBlock = iv; // assume iv is arr
    let results = [];
    for (let i = 0; i < blocks.length; i += 1) {
      //let words = CryptoJS.lib.WordArray.init(blocks[i]);
      //return words;
      let words = lib.tob64(blocks[i]);
      //let prepped64 = lib.tob64(prepped);
  
      // I'm doing some real janky extra base64ing here
      let plainText = CryptoJS.AES.decrypt(words, encKey, {mode: CryptoJS.mode.ECB,  padding: CryptoJS.pad.NoPadding });
  
      // this is weird, I don't know what's happening
      plainText = new CryptoJS.lib.WordArray.init(plainText.words);
  
      let ptArr = lib.fromb64(CryptoJS.enc.Base64.stringify(plainText));
  
      //return words;
    
      let dexord = xorZip(ptArr, lastBlock);
  
      
      results.push(dexord);
      lastBlock = blocks[i];
    }
    
    // count IV as "block -1"
    // XOR block against block -1, then encrypt it.
    // concat the blocks together again
    // return base64 encoded
  
    return lib.tob64(dePad(results.flat(), 16))
  }

export {decryptAes128Ecb, decryptAes128EcbStr, encryptAes128Ecb, encryptAes128EcbStr, padBlock, encryptAes128Cbc, decryptAes128Cbc};