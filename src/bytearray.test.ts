
import { ByteArray } from "./bytearray";


describe("ByteArray", () => {
    test("fromString", () => {      
        expect(ByteArray.fromString("hello").toString()).toBe("hello");
    });

    test("get", () => {
        expect(ByteArray.fromString("hello")[0]).toBe(104);
    })
});