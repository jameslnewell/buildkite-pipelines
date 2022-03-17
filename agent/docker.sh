#!/usr/bin/env bash

cd ./agent || exit
docker build -t bk-agent  .
docker run \
  -e BUILDKITE_AGENT_TOKEN \
  -v "$(pwd)/hooks/environment:/buildkite/hooks/environment" \
  -v "${HOME}/.ssh/github_id_rsa:/buildkite-secrets/id_rsa_buildkite_git" \
  bk-agent