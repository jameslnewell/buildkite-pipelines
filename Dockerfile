FROM node:16-alpine
WORKDIR /workdir

RUN yarn global add @jameslnewell/buildkite-pipelines@1.0.2
RUN export PATH="$PATH:$(yarn global bin)"
RUN ls ~/.yarn && exit 1