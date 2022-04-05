#!/usr/bin/env node
import yargs from "yargs";
import resolveCallback from "resolve";
import debug from "debug";
import { stringify, validate } from "./api";

const log = debug("buildkite-pipelines");

const resolve = (id: string) =>
  new Promise<string>((resolve, reject) =>
    resolveCallback(id, { basedir: process.cwd() }, (error, path) => {
      if (error || !path) {
        reject(error);
      } else {
        resolve(path);
      }
    })
  );

(async () => {
  await yargs.command(
    "$0 <file>",
    "Generate a Buildkite pipeline",
    (yargs) =>
      yargs
        .option("require", {
          type: "string",
          alias: "r",
          description: `Require a module on startup`,
        })
        .positional("file", {
          type: "string",
          demandOption: true,
        }),
    async (argv) => {
      const { file, require } = argv;

      // coerce the requires into an array
      const requires: string[] = Array.isArray(require)
        ? (require as unknown as string[])
        : require
        ? [require]
        : [];

      // import scripts in order to setup transpilers and stuff
      for (const r of requires) {
        log("requiring: %s", r);
        const m = await resolve(r);
        await import(m);
      }

      // check the pipeline file is specified
      if (!file) {
        console.error(`No pipeline file specified`);
        process.exitCode = 1;
        return;
      }

      // import the pipeline
      log("requiring pipeline: %s", file);
      const m = await resolve(file);
      let pipeline = await import(m);

      // use default property
      if (pipeline.default) {
        log("using default property");
        pipeline = pipeline.default;
      }

      // create the pipeline if its a factory
      if (typeof pipeline === "function") {
        log("executing pipeline");
        pipeline = await pipeline();
      }

      // build the pipeline if its a builder
      if (typeof pipeline.build === "function") {
        log("building pipeline");
        pipeline = pipeline.build();
      }

      // validate
      const errors = validate(pipeline);
      if (errors.length) {
        for (const error of errors) {
          console.error(error);
        }
        process.exitCode = 1;
        return;
      }

      log("stringifying pipeline");
      console.log(stringify(pipeline));
    }
  ).argv;
})();
