FROM node:26-alpine

WORKDIR /

ENV PATH="/node_modules/.bin:${PATH}"
RUN yarn add @jameslnewell/buildkite-pipelines@latest --production && \
  yarn cache clean

WORKDIR /workdir
