FROM node:16.15.0-alpine as Pruning

WORKDIR /app

COPY . .

ARG SCOPE
RUN npx turbo prune --scope=${SCOPE} --docker

FROM node:16.15.0-alpine as Deps

WORKDIR /app

COPY --from=Pruning /app/out/json/ .
COPY --from=Pruning /app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

FROM node:16.15.0-alpine as Builder

WORKDIR /app

COPY --from=Deps /app/ .
COPY --from=Pruning /app/out/full/ .

ARG SCOPE

RUN yarn turbo run build --scope=${SCOPE}

FROM node:16.15.0-alpine as Runner

WORKDIR /app

COPY --from=Builder /app .

ARG DIRECTORY

WORKDIR /app/${DIRECTORY}

EXPOSE 4000
ENV NODE_ENV=production

CMD ["yarn", "start"]