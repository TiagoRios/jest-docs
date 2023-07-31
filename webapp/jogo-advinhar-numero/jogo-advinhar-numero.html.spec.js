/**
 * @jest-environment jsdom
 */
 
const { TextDecoder, TextEncoder} = require('util');
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

const { JSDOM } = require('jsdom');

let jstring;
let jsdomFileHtml;
let jsomHtmlPequenoSimples = new JSDOM(`
<body>
  <h1>Advinhe o número</h1>
  <p>Número aleatória de 1 a 100. Tente advinhar em no máximo 10 palpites.</p>
  <div class="form">
    <label for="guessField">Entre com palpite: </label>
    <input type="text" id="guessField" class="guessField">
    <input type="submit" value="Enviar palpite" class="guessSubmit">
  </div>
  <div class="resultParas">
    <p class="guesses"></p>
    <p class="lastResult"></p>
    <p class="lowOrHi"></p>
  </div>
  <script src="jogo-advinhar-numero.js" defer></script>
</body>`).window;

//Demora muito, porque precisa carregar = HTML, CSS, JS. e serializar o retorno.
beforeAll(async () => {
    jstring = await JSDOM.fromFile('./src/webapp/jogo-advinhar-numero/jogo-advinhar-numero.html').then(x => {return x.serialize();});
    jsdomFileHtml = new JSDOM(jstring).window;
})

test('verifica quant. filhos em body - usa string html grande', () => {
    expect(jsomHtmlPequenoSimples.document.body.children.length).toBe(5);
});

test('verifica quant. filhos em body - promises com JSDOM.FromFile', () => {
    expect(jsdomFileHtml.document.body.children.length).toBe(5);
});