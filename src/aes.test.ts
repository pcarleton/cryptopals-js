
import * as aes from "./aes";
import * as enc from "./encoding";


describe("ECB", () => {
    const plaintext = "I'm back and I'm ringin' the bell ";
    const shortCipherBase64 = "CRIwqt4+szDbqkNY+I0qbDe3LQz0wiw0SuxBQtAM5TBoxgSOTPhGay0sJsfzQM3X";
    const key = "YELLOW SUBMARINE";

    const ptBa = enc.ByteArray.fromString(plaintext);
    const cipherBa = enc.ByteArray.fromb64(shortCipherBase64);
    const keyBa = enc.ByteArray.fromString(key);
    test("decryptAes128Ecb", () => {
        expect(aes.decryptAes128Ecb(cipherBa, keyBa)).toStrictEqual(ptBa);
    })

    test("encryptAes128Ecb", () => {
        expect(aes.encryptAes128Ecb(ptBa, keyBa)).toStrictEqual(cipherBa);
    })

    test("decryptAes128EcbStr", () => {
        expect(aes.decryptAes128EcbStr(shortCipherBase64, key)).toBe(plaintext);
    })


    test("decryptAes128EcbStr", () => {
        expect(aes.encryptAes128EcbStr(plaintext, key)).toBe(shortCipherBase64);
    })

    test("padBlock", () => {
        const input = [0, 1, 2, 3];
        expect(aes.padBlock(input, 6)).toStrictEqual([0, 1, 2, 3, 2, 2]);
        expect(aes.padBlock(input, 7)).toStrictEqual([0, 1, 2, 3, 3, 3, 3]);
    });

    
});


describe("CBC", () => {
    const plaintext = "hi there, this is longer than 1 block";
    const iv = Array(16).fill(2);
    const encryptedBase64 = "/SoxOUu3YsSebpKAPAqdVugO4ldEPwJvc+jYcQld7DdXs+j80XEwWJKphfAnpkO3";
    const key = "yellow submarine";

    const plaintextBA = enc.ByteArray.fromString(plaintext);
    const ivBA = enc.ByteArray.fromBytes(iv);
    const keyBA = enc.ByteArray.fromString(key);
    const encryptedBA = enc.ByteArray.fromb64(encryptedBase64);

    test("decryptAes128Cbc", () => {
        expect(enc.btos(enc.fromb64(aes.decryptAes128Cbc(encryptedBase64, iv, key)))).toBe(plaintext);
    })

    test("encryptAes128Cbc", () => {
        expect(aes.encryptAes128Cbc(plaintextBA, ivBA, keyBA)).toStrictEqual(encryptedBA);
    })
});