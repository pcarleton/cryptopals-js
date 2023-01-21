import * as enc from './encoding'
import * as CryptoJS from "crypto-js";
import * as Plot from "@observablehq/plot";


class ByteArray extends Array {
    //bytes: number[];
  
    constructor(...bytes: number[]) {
      super(...bytes);
      //this.bytes = bytes;
    }
    static fromb64(b64: string): ByteArray {
      return ByteArray.from(enc.fromb64(b64));
    }
    static from(x: number[]) {
      return new ByteArray(...x);
    }

    static fromBytes(x: number[]) {
      return new ByteArray(...x);
    }


    static fromString(x: string) {
      return ByteArray.from(enc.stob(x));
    }
    static fromHex(x: string) {
      return ByteArray.from(enc.fromHex(x));
    }
  
    static fromWordArray(x: CryptoJS.lib.WordArray) {
      return ByteArray.from(enc.fromHex(x.toString()));
    }
  
    toWordArray(): CryptoJS.lib.WordArray {
      return CryptoJS.enc.Hex.parse(this.toHex());
    }
  
    toString() {
      return enc.btos(this);
    }
  
    tob64() {
      return enc.tob64(this);
    }
  
    toHex() {
      return enc.toHex(this);
    }

    plot(opts: {modes?: string[], limit?: number, blocksize?: number, highlightBlocks?: boolean}) {

    }
  }




  const BA = (bytes) => new ByteArray(...bytes);
  
  export {ByteArray, BA};