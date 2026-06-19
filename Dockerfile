FROM node:24-slim AS base
WORKDIR /app
RUN corepack enable pnpm


FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build


FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir .next
RUN chown node:node .next # Establece los permisos correctos para la cache de Next.js
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000

CMD ["node", "server.js"]
