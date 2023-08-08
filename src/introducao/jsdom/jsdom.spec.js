const { JSDOM } = require('jsdom');
//posso chamar sem document e sem window
let jsDocument = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`).window.document;

test('deve pegar conteudo da tag <P>', () => {
    let conteudoP = jsDocument.querySelector("p").textContent;
    expect(conteudoP).toBe('Hello world');
});

test('deve verificar quantidade de filhos', () => {
    expect(jsDocument.body.children.length).toBe(1);
});