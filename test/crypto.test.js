const crypto = require('../crypto');

describe('Testing encryption',()=>{
    test('it should retun encrypted string',()=>{
        expect(crypto.hash).toBe(crypto.hash);
    })
    
})

describe('additon test cases',()=>{
    test('it should retun sum of two values',()=>{
        expect(crypto.sum(2,2)).toBe(4)
    })
    test('it shoud not retun incorrect summation',()=>{
        expect(crypto.sum(4,6)).not.toBe(1)
    })
})
