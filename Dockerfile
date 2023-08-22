FROM node:18 as dev

FROM node:18 as build
WORKDIR /app
COPY . /app/.
RUN npm install
RUN npm run build

FROM node:18-slim as prod
WORKDIR /app
USER node
COPY --from=build /app/.output /app/.output
ENV NODE_ENV=production
CMD ["node", ".output/server/index.mjs"]
