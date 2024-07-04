const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const url = `https://fundamentus.com.br/detalhes.php?papel=${symbol}`;
    const urlProv = `https://fundamentus.com.br/proventos.php?papel=${symbol}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
        const element = document.querySelector('.data.destaque.w3');
        return element ? element.innerText : 'N/A';
    });

    await page.goto(urlProv);

    const proventos = await page.evaluate(() => {
        // Adicione a função toggleClasse() se necessário
        // toggleClasse();

        // Seleciona todas as linhas dentro do tbody
        var rows = document.querySelectorAll('#resultado-anual tbody tr');

        // Armazena os resultados em um array
        var provs = [];

        rows.forEach(row => {
            var cells = row.querySelectorAll('td');
            var ano = cells[0].textContent;
            var valor = cells[1].textContent;
            provs.push({ ano, valor });
        });

        return provs;
    });

    await browser.close();

    res.json({ stock: symbol, price: result, proventos: proventos });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
