FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN corepack enable

COPY . /app

RUN pnpm i -r
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]