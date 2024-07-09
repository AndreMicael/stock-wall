const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const port = process.env.PORT || 3001;


// Rota para a raiz ("/")
app.get('/', (req, res) => {
  res.send('Bem-vindo ao serviço de consulta de ações!');
});

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `https://fundamentus.com.br/detalhes.php?papel=${symbol}`;
    const urlProv = `https://fundamentus.com.br/proventos.php?papel=${symbol}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
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
        // Adicione a função toggleClasse() se necessário
        if (typeof toggleClasse === 'function') {
            toggleClasse();
        }

        // Seleciona todas as linhas dentro do tbody
        const rows = document.querySelectorAll('#resultado-anual tbody tr');

        // Armazena os resultados em um array
        const provs = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const ano = cells[0]?.textContent || 'N/A';
            const valor = cells[1]?.textContent || 'N/A';
            provs.push({ ano, valor });
        });

        return provs;
    });

    await browser.close();

    res.json({ stock: symbol, price: result, proventos: proventos });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
