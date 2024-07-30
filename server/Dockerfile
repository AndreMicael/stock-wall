FROM ghcr.io/puppeteer/puppeteer:22.12.1

ENV PUPPETTER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app

# Copiar os arquivos do projeto
COPY app/package*.json ./

# Mudar para o usuário root
USER root

# Instalar as dependências
RUN npm ci

# Voltar para o usuário padrão
USER pptruser

CMD ["node", "server.js"]



