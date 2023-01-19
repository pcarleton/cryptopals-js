import {oracle} from './oracle'



describe("oracle", () => {
    test("guesses correctly", () => {

        const g1 = oracle();

        expect(g1.modeGuess).toBe(g1.mode);
    })
});