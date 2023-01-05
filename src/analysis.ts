function makeFreqTable<T>(s: T[]): Map<T, number> {
    let ret : Map<T, number> = new Map();

    return s.reduce((acc, c) => {
        acc.set(c, (acc.get(c) || 0) + 1);
        return acc
    }, ret); 
}


export {makeFreqTable}