FROM node:16-alpine
WORKDIR /workdir

ENV PATH="/workdir/node_modules/.bin:${PATH}"
RUN yarn add @jameslnewell/buildkite-pipelines

ENTRYPOINT ["buildkite-pipelines"]