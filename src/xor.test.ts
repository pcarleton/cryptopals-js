
import { xorByteArray, repeatedXor } from "./xor";
import { ByteArray } from "./bytearray";

describe("xor", () => {
    test("xor", () => {
        expect(xorByteArray(ByteArray.from([1, 2, 3]), ByteArray.from([1, 2, 3]))).toStrictEqual(ByteArray.from([0, 0, 0]));
    });

    test("repeated xor", () => {
        expect(repeatedXor(ByteArray.from([1, 2, 3]), ByteArray.from([1, 2, 3]))).toStrictEqual(ByteArray.from([0, 0, 0]));
        expect(repeatedXor(ByteArray.from([1, 2, 3]), ByteArray.from([1, 2]))).toStrictEqual(ByteArray.from([0, 0, 2]));

        expect(repeatedXor(ByteArray.from([1, 2, 3]), ByteArray.from([1, 2, 3, 4]))).toStrictEqual(ByteArray.from([0, 0, 0]))
    });
});