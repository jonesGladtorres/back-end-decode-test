# ----- Estágio 1: Build -----
# Começamos com uma imagem Node.js para garantir a compatibilidade
FROM node:20-slim as build

# Isso é necessário para que o modo de "watch" do NestJS consiga reiniciar corretamente
RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

# Instala o Bun
RUN npm install -g bun

WORKDIR /usr/src/app

# Copia os arquivos de manifesto
COPY package.json bun.lockb* ./

# Instala TODAS as dependências usando Bun
RUN bun install

# Copia o resto do código da sua aplicação
COPY . .

# Remove as dependências de desenvolvimento para limpar a instalação
RUN bun install --production


# ----- Estágio 2: Produção -----
# A imagem de produção também será baseada em Node.js
FROM node:20-slim

RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

# Instala o Bun
RUN npm install -g bun

WORKDIR /usr/src/app

# Copia a aplicação pronta do estágio de build
COPY --from=build /usr/src/app .

# Expõe a porta que a aplicação vai usar
EXPOSE 3333

# O comando para iniciar a aplicação usando o Bun
CMD ["bun", "src/main.ts"]
