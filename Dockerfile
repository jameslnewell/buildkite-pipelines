FROM node:16-alpine
WORKDIR /workdir

RUN yarn global add @jameslnewell/buildkite-pipelines
RUN export PATH="$(yarn global bin):$PATH"
RUN ls ~/.yarn && exit 1