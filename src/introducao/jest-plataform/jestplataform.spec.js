/**
 * só copiei e colei para verificar a saída
 */

const { diff } = require('jest-diff');
const { getType } = require('jest-get-type');
const { validate } = require('jest-validate');
const { prettyFormat } = require('pretty-format');
const { parseWithComments } = require('jest-docblock');

const code = `
/**
 * This is a sample
 *
 * @flow TESTEST
 */

console.log('Hello World!');
`;

//validade
const configByUser = {
  transform: '<rootDir>/node_modules/my-custom-transform',
};
const resultadoValidate = validate(configByUser, {
  comment: '  Documentation: http://custom-docs.com',
  exampleConfig: { transform: '<rootDir>/node_modules/babel-jest' },
});

const val = { object: {} };
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN];

describe('testando a jest-plataform', () => {
  test('deve utilizar o diff', () => {
    let msgDiff = "no visual difference.";
    expect(diff('autor', 'autor')).toMatch(msgDiff);
  });
  test('deve utilizar o parseWithComments', () => {
    expect(parseWithComments(code).comments).toMatch(/\/\*\*/);
    expect(parseWithComments(code).comments).toMatch(/[A-Za-z]ello [A-Za-z]orld/);
    expect(parseWithComments(code).comments).toMatch(/log\(/);
    expect(parseWithComments(code).pragmas.flow).toEqual('TESTEST');
    expect(parseWithComments(code).pragmas['flow']).toEqual('TESTEST');
    expect(parseWithComments(code).pragmas.flow.length).toEqual(7);
  });
  test('deve utilizar o getType', () => {
    expect(getType(code)).toBe('string');
    expect(getType(val)).toBe('object');
  });
  test('deve utilizar o validade', () =>{
    expect(resultadoValidate.isValid).toBe(true);
  });
});