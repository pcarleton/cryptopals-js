
import * as lib from "./aes";
import * as enc from "./encoding";


describe("ECB", () => {
    const plaintext = "I'm back and I'm ringin' the bell ";
    const shortCipherBase64 = "CRIwqt4+szDbqkNY+I0qbDe3LQz0wiw0SuxBQtAM5TBoxgSOTPhGay0sJsfzQM3X";
    const key = "YELLOW SUBMARINE";
    test("decryptAes128Ebc", () => {
        expect(lib.decryptAes128Ebc(shortCipherBase64, key)).toBe(plaintext);
    })

    test("encryptAes128Ebc", () => {
        expect(lib.encryptAes128Ebc(plaintext, key)).toBe(shortCipherBase64);
    })

    test("padBlock", () => {
        const input = [0, 1, 2, 3];
        expect(lib.padBlock(input, 6)).toStrictEqual([0, 1, 2, 3, 2, 2]);
        expect(lib.padBlock(input, 7)).toStrictEqual([0, 1, 2, 3, 3, 3, 3]);
    });

    
});


describe("CBC", () => {
    const plaintext = "hi there, this is longer than 1 block";
    const iv = Array(16).fill(2);
    const encryptedBase64 = "/SoxOUu3YsSebpKAPAqdVugO4ldEPwJvc+jYcQld7DdXs+j80XEwWJKphfAnpkO3";
    const key = "yellow submarine";

    test("decryptAes128Cbc", () => {
        expect(enc.btos(enc.fromb64(lib.decryptAes128Cbc(encryptedBase64, iv, key)))).toBe(plaintext);
    })
});