FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN corepack enable

COPY . /app

RUN pnpm i -r
RUN pnpm build

EXPOSE 3005

CMD ["pnpm", "start"]