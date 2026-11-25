FROM node:22-slim AS builder

WORKDIR /auth

RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

RUN corepack enable && \
    corepack prepare yarn@4.17.0 --activate

RUN mkdir -p apps/auth-service

COPY package.json yarn.lock .yarnrc.yml nx.json tsconfig.base.json tsconfig.json ./

COPY apps/auth-service/package.json \
     apps/auth-service/tsconfig.json \
     apps/auth-service/tsconfig.app.json \
     ./apps/auth-service

COPY .yarn ./.yarn
COPY libs ./libs
COPY apps/auth-service ./apps/auth-service

RUN yarn install

RUN yarn nx sync

RUN yarn nx build @review-hub/auth-service


FROM node:22-slim

WORKDIR /auth

COPY --from=builder /auth/package.json ./
COPY --from=builder /auth/node_modules ./node_modules
COPY --from=builder /auth/apps/auth-service/dist ./apps/auth-service/dist
COPY --from=builder /auth/libs/prisma/dist ./libs/prisma/dist
COPY --from=builder /auth/libs/prisma/package.json ./libs/prisma/package.json

CMD ["node", "apps/auth-service/dist/main.js"]
