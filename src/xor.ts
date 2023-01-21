
import { ByteArray } from "./bytearray";

function xorByteArray(a: ByteArray, b: ByteArray): ByteArray {
  const result = new ByteArray(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i];
  }
  return result;
}

function repeatedXor(a: ByteArray, b: ByteArray): ByteArray {
  const result = new ByteArray(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i % b.length];
  }
  return result;
}

export {xorByteArray, repeatedXor};