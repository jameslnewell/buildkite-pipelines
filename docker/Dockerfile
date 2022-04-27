FROM node:16-alpine

WORKDIR /

ENV PATH="/node_modules/.bin:${PATH}"
RUN yarn add @jameslnewell/buildkite-pipelines@latest --production

WORKDIR /workdir
