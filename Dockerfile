FROM node:16-alpine
WORKDIR /workdir

RUN yarn global add @jameslnewell/buildkite-pipelines
