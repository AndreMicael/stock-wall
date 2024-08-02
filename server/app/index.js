const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Bem-vindo ao serviço de consulta de ações!');
});

app.get('/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const url = `https://fundamentus.com.br/detalhes.php?papel=${symbol}`;
  const urlProv = `https://fundamentus.com.br/proventos.php?papel=${symbol}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--no-zygote']
  });
  const page = await browser.newPage();

  try {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');

    await page.goto(url);
    await page.waitForSelector("body > div.center > div.conteudo.clearfix > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)");

    const result = await page.evaluate(() => {
      const empresa = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)");
      const setor = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)");
      const element = document.querySelector('.data.destaque.w3');
      const lpa = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(6)");
      const vpa = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(6) > span");

      return {
        empresa: empresa ? empresa.innerText : 'N/A',
        element: element ? element.innerText : 'N/A',
        lpa: lpa ? lpa.innerText : 'N/A',
        vpa: vpa ? vpa.innerText : 'N/A',
        setor: setor ? setor.innerText : 'N/A',
      };
    });

    console.log('Result:', result); // Adicione este log para depuração

    await page.goto(urlProv);
    await page.waitForSelector('#resultado-anual tbody tr');

    const proventos = await page.evaluate(() => {
      const rows = document.querySelectorAll('#resultado-anual tbody tr');
      const provs = [];

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const ano = cells[0]?.textContent || 'N/A';
        const valor = cells[1]?.textContent || 'N/A';
        provs.push({ ano, valor });
      });

      return provs;
    });

    console.log('Proventos:', proventos); // Adicione este log para depuração

    res.json({ stock: symbol, price: result, proventos: proventos });
  } catch (error) {
    console.error('Erro ao consultar ação:', error);
    res.status(500).json({ error: 'Erro ao consultar ação' });
  } finally {
    await browser.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
