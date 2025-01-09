FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:20-alpine as runner

WORKDIR /app
COPY --from=builder /app/.output /app/.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]