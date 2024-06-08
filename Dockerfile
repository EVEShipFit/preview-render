FROM node:20-slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt update && apt install -y --no-install-recommends chromium && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY server.js /app/
CMD ["node", "server.js"]
