FROM node:20.11.1-alpine3.19 AS base

ENV DIR /food-ordering-api

WORKDIR ${DIR}

RUN corepack enable pnpm && \
    apk update && \
    apk add --no-cache dumb-init


FROM base AS build

COPY package.json ${DIR}/package.json
COPY pnpm-lock.yaml ${DIR}/pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY tsconfig.json ${DIR}/tsconfig.json
COPY tsconfig.build.json ${DIR}/tsconfig.build.json
COPY .swcrc ${DIR}/.swcrc
COPY nest-cli.json ${DIR}/nest-cli.json
COPY src ${DIR}/src

RUN pnpm build && \
    rm -rf node_modules && \
    pnpm install --prod --frozen-lockfile


FROM base AS production

ENV NODE_ENV="production"

COPY --from=build ${DIR}/node_modules ${DIR}/node_modules
COPY --from=build ${DIR}/dist ${DIR}/dist

EXPOSE ${PORT}

USER node

ENTRYPOINT ["dumb-init", "--"]

CMD ["sh", "-c", "pnpm dlx typeorm migration:run -d dist/common/database/libs/typeorm.lib.js && node dist/main.js"]
