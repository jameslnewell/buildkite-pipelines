FROM node:alpine
WORKDIR /workdir

RUN yarn global add @jameslnewell/buildkite-pipelines
