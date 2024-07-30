const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Configuração do CORS para permitir qualquer origem
const corsOptions = {
  origin: '*', // Permite qualquer origem
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Headers permitidos
  maxAge: 86400, // Tempo de cache da pré-resposta (preflight) em segundos
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Bem-vindo ao serviço de consulta de ações!');
});

app.get('/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const url = `https://fundamentus.com.br/detalhes.php?papel=${symbol}`;
  const urlProv = `https://fundamentus.com.br/proventos.php?papel=${symbol}`;

  const browser = await puppeteer.launch({ headless: true ,
    args: ['--no-sandbox', '--disable-setuid-sandbox',"--single-process","--no-zygote"],
    // process.env.NODE_ENV === 'production' ? process.env.PUPETEER_EXECUTABLE_PATH
    // : puppeteer.executablePath(),

  });
  const page = await browser.newPage();
  
  try {
    await page.goto(url);

    const result = await page.evaluate(() => {
      const empresa = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)");
      const setor = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)");
      const element = document.querySelector('.data.destaque.w3');
      const lpa = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(6)");
      const vpa = document.querySelector("body > div.center > div.conteudo.clearfix > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(6) > span");

      if (element && lpa && vpa && empresa && setor) {
        return {
          empresa: empresa.innerText,
          element: element.innerText,
          lpa: lpa.innerText,
          vpa: vpa.innerText,
          setor: setor.innerText,
        };
      } else {
        return 'N/A';
      }
    });

    await page.goto(urlProv);

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
