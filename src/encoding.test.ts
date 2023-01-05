import * as lib from './encoding'


describe("encoding functions", () => {
    test("chunkArr", () => {
        expect(lib.chunkArr([1, 2, 3, 4, 5, 6], 3)).toStrictEqual([[1, 2, 3], [4, 5, 6]]);
        expect(lib.chunkArr([1, 2, 3, 4, 5], 3)).toStrictEqual([[1, 2, 3], [4, 5]]);
        expect(lib.chunkArr([1, 2, 3, 4, 5], 2)).toStrictEqual([[1, 2], [3, 4], [5]]);
    })

    test("byteStr", () => {
        expect(lib.toByteStr([75, 76])).toBe("KL");
        expect(lib.fromByteStr("KL")).toStrictEqual([75, 76]);
    })

    test("hex", () => {
        expect(lib.toHex1(255)).toBe("ff");
        expect(lib.toHex1(8)).toBe("08");

        expect(lib.toHex([255, 8])).toBe("ff08");

        expect(lib.fromHex("ff08")).toStrictEqual([255, 8]);
    })

    test("atoi etc.", () => {
        expect(lib.atoi("a")).toBe(97);
        expect(lib.itoa(75)).toBe("K");
        expect(lib.atoi("A")).toBe(65);

    })

    test("toBitArr", () => {
        expect(lib.toBitArr(  1).join("")).toBe("00000001");
        expect(lib.toBitArr( 32).join("")).toBe("00100000");
        expect(lib.toBitArr(255).join("")).toBe("11111111");
    })

    test("fromBitArr", () => {
        expect(lib.fromBitArr([0, 0, 0, 0, 0, 0, 0, 0])).toBe(0);
        expect(lib.fromBitArr([0, 0, 0, 0, 0, 0, 0, 1])).toBe(1);
        expect(lib.fromBitArr([1, 0, 0, 0, 0, 0, 0, 0])).toBe(128);
        expect(lib.fromBitArr([1, 1, 1, 1, 1, 1, 1, 1])).toBe(255);
    })

    test("base64", () => {
        expect(lib.tob64([255, 255, 255])).toBe("////");
        expect(lib.tob64([255, 0, 255])).toBe("/wD/");
        expect(lib.tob64([0, 0, 0])).toBe("AAAA");

        expect(lib.fromb64("AAAA")).toStrictEqual([0, 0, 0]);
        expect(lib.fromb64("/wD/")).toStrictEqual([255, 0, 255]);
        expect(lib.fromb64("////")).toStrictEqual([255, 255, 255]);
    })
})