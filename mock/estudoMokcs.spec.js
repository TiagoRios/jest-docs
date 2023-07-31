function meuForEach(items, callback) {
    for (const element of items) {
        callback(element);
    }
}

const meuMock = jest
    .fn(x => 15 + x) // implementação default
    .mockImplementationOnce(x => 15 + x)
    .mockName('myMockName'); //precisa 1 linha

//return all methods of meuMock
//console.log(meuMock);
    
beforeAll(() => {
    meuForEach([2, 5, 8, 13, 20, 33], meuMock);
    meuForEach([92, 95, 98, 913, 920, 933], meuMock);
})

describe('mocks in JavaScript', () => {
    test('should return length of array', () => {
        expect(meuMock.mock.calls).toHaveLength(12);
        expect(meuMock.mock.calls.length).toBe(12);
        expect(meuMock.mock.results.length).toBe(12);
        expect(meuMock.mock.contexts.length).toBe(12);
        expect(meuMock.mock.instances.length).toBe(12);
    });

    test('should return the first arg of each call', () => {
        expect(meuMock.mock.calls[0][0]).toBe(2);
        expect(meuMock.mock.calls[1][0]).toBe(5);
        expect(meuMock.mock.calls[2][0]).toBe(8);
    });

    test('should return the value of 2nd call = (5 + 15) results 20.', () => {
        expect(meuMock.mock.results[1].value).toBe(20);
    });

    test('should return the last call', () => {
        expect(meuMock.mock.lastCall[0]).toBe(933);
    });

    test('should return the name of mock', () => {
        expect(meuMock.getMockName()).not.toBe('jest.fn()');
        expect(meuMock.getMockName()).toEqual('myMockName');
    });
});