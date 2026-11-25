FROM node:22 AS builder

WORKDIR /api

RUN corepack enable && corepack prepare yarn@4.17.0 --activate
RUN mkdir -p apps/api-gateway

COPY package.json yarn.lock .yarnrc.yml nx.json tsconfig.base.json tsconfig.json ./

COPY apps/api-gateway/package.json \
     apps/api-gateway/tsconfig.json \
     apps/api-gateway/tsconfig.app.json \
     ./apps/api-gateway

COPY .yarn ./.yarn
COPY apps/api-gateway ./apps/api-gateway

RUN yarn install || (cat /tmp/xfs-*/build.log && exit 1)
RUN yarn nx sync
RUN yarn nx build @review-hub/api-gateway

FROM node:22-slim

WORKDIR /api

COPY --from=builder /api/package.json ./
COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/apps/api-gateway/dist ./apps/api-gateway/dist

CMD ["node", "apps/api-gateway/dist/main.js"]
