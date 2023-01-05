import * as lib from './analysis'


describe("analysis", () => {
    test("freq table", () => {

        const toM = (o: any): Map<any, any> => (new Map(Object.entries(o)));
        expect(lib.makeFreqTable("aba".split(""))).toStrictEqual(toM({"a": 2, "b": 1}));
        expect(lib.makeFreqTable("aaaaabc".split(""))).toStrictEqual(toM({"a": 5, "b": 1, "c": 1}));
    })
});