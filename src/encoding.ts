export function chunkArr(arr: number[], chunkSize: number): number[][] {
  let chunks : number[][] = [];
 
 for (let i = 0; i < arr.length; i += chunkSize) {
   chunks.push(arr.slice(i, i+chunkSize));
 }
 
 return chunks;
}

const hexAlphabet = "0123456789abcdef";

const toByteStr =  (a:number[]) => String.fromCharCode(...a);
const fromByteStr = (s:string) => s.split("").map((c:string) => c.charCodeAt(0));

const toHex1 = (x: number) => {
  let hex = x.toString(16);
  if (hex.length == 1) { hex = "0" + hex;}
  return hex
};
const toHex: ((a: number[]) => string) =  (s: number[]) => s.map(toHex1).join("");

const fromHex: (s: string) => number[] = (s: string) => {

  if ((s.length % 2) !== 0) {
    throw 'hex string must have length divisible by 2';
  }

  let ints = [];

  for (let i = 0; i < s.length; i += 2) {
    let c1 = s[i];
    let c2 = s[i+1];

    let b = hexAlphabet.indexOf(c2) + (hexAlphabet.indexOf(c1) << 4);

    ints.push(b);
  }

  return ints;

}
export {toByteStr, fromByteStr, toHex1, toHex};
export {fromHex};


// Binary etc.
const itoa = (i: number): string => String.fromCharCode(i);
const atoi = (a: string): number => a.charCodeAt(0);
const stob =  (s: string): number[] => s.split("").map(atoi);
const btos = (arr: number[]): string => arr.map(itoa).join("");

export {itoa, atoi, stob, btos};


type BitArray = [number, number, number, number,
                 number, number, number, number];

// Bit array
const toBitArr = (c: number): BitArray => {  
  if (c > 255) {
    throw 'must be 8 bit byte';
  }

  let result: BitArray = [0, 0, 0, 0, 0, 0, 0, 0];

  result[7] = (c & 1) > 0 ? 1 : 0; 
  result[6] = (c & 2) > 0 ? 1 : 0; 
  result[5] = (c & 4) > 0 ? 1 : 0; 
  result[4] = (c & 8) > 0 ? 1 : 0; 
  result[3] = (c & 16) > 0 ? 1 : 0; 
  result[2] = (c & 32) > 0 ? 1 : 0; 
  result[1] = (c & 64) > 0 ? 1 : 0; 
  result[0] = (c & 128) > 0 ? 1 : 0; 

  return result;
}

const fromBitArr = (x: BitArray): number => {
  let result = 0;

  for (let i = 0; i < 8; i += 1) {
    result |= x[7 - i] << i
  }

  return result;
}


export {toBitArr, fromBitArr}


// Base64

const tob64 = (arr: number[]): string => btoa(toByteStr(arr));
const fromb64 = (s: string): number[] => fromByteStr(atob(s));
export {tob64, fromb64}