FROM node:16-alpine
WORKDIR /workdir

RUN export PATH="$(yarn global bin):$PATH"
RUN yarn global add @jameslnewell/buildkite-pipelines
