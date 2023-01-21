import * as enc from './encoding'
import * as CryptoJS from "crypto-js";
import * as Plot from "@observablehq/plot";


class ByteArray {
    bytes: number[];
  
    constructor(bytes: number[]) {
      this.bytes = bytes;
    }
    static fromb64(b64: string) {
      return new ByteArray(enc.fromb64(b64));
    }
    static fromBytes(x: number[]) {
      return new ByteArray(x);
    }
    static fromString(x: string) {
      return new ByteArray(enc.stob(x));
    }
    static fromHex(x: string) {
      return new ByteArray(enc.fromHex(x));
    }
  
    static fromWordArray(x: CryptoJS.lib.WordArray) {
      return new ByteArray(enc.fromHex(x.toString()));
    }
  
    toWordArray(): CryptoJS.lib.WordArray {
      return CryptoJS.enc.Hex.parse(this.toHex());
    }
  
    toString() {
      return enc.btos(this.bytes);
    }
  
    tob64() {
      return enc.tob64(this.bytes);
    }
  
    toHex() {
      return enc.toHex(this.bytes);
    }

    plot(opts: {modes?: string[], limit?: number, blocksize?: number, highlightBlocks?: boolean}) {

    }
  }

  const BA = (bytes) => ByteArray.fromBytes(bytes)
  
  export {ByteArray, BA};