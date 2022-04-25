FROM node:16-alpine

WORKDIR /

ENV PATH="/workdir/node_modules/.bin:${PATH}"
RUN yarn add @jameslnewell/buildkite-pipelines@latest

WORKDIR /workdir
