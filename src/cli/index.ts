#!/usr/bin/env node
import yargs from 'yargs';
import resolveCallback from 'resolve';
import debug from 'debug';
import {stringify, validate} from '../lib';
import {isPipelineBuilder} from '../lib/builders/isPipelineBuilder';

const log = debug('buildkite-pipelines');

const resolve = (id: string, basedir: string) =>
  new Promise<string>((resolve, reject) =>
    resolveCallback(id, {basedir}, (error, path) => {
      if (error || !path) {
        reject(error);
      } else {
        resolve(path);
      }
    }),
  );

(async () => {
  await yargs.command(
    '$0 <file>',
    'Generate a Buildkite pipeline',
    (yargs) =>
      yargs
        .option('require', {
          type: 'string',
          alias: 'r',
          description: `Require a module on startup`,
        })
        .option('cwd', {
          type: 'string',
          description: `Change the working directory`,
        })
        .option('ignore-validation-errors', {
          boolean: true,
          description:
            'Output the pipeline and exit cleanly when the pipeline is not valid',
        })
        .positional('file', {
          type: 'string',
          demandOption: true,
          description: 'A file exporting a pipeline object',
        }),
    async (argv) => {
      const {file, require, cwd} = argv;

      // change the current working directory
      const basedir = process.cwd();
      if (cwd) process.chdir(cwd);

      // coerce the requires into an array
      const requires: string[] = Array.isArray(require)
        ? (require as unknown as string[])
        : require
        ? [require]
        : [];

      // import scripts in order to setup transpilers and stuff
      for (const r of requires) {
        log('requiring: %s', r);
        let m: string;
        try {
          m = await resolve(r, basedir);
          await import(m);
        } catch (error) {
          console.error();
          console.error(`💥 ERROR`);
          console.error();
          console.error(`An error occurred whilst requiring "${r}"`);
          console.error();
          console.error(error);
          process.exitCode = 1;
          return;
        }
      }

      // check the pipeline file is specified
      if (!file) {
        console.error(`No pipeline file specified`);
        process.exitCode = 1;
        return;
      }

      // import the pipeline
      log('importing pipeline: %s', file);
      let m: string;
      let pipeline;
      try {
        m = await resolve(file, basedir);
        pipeline = await import(m);
      } catch (error) {
        console.error();
        console.error(`💥 ERROR`);
        console.error();
        console.error(`An error occurred whilst executing "${file}"`);
        console.error();
        console.error(error);
        process.exitCode = 1;
        return;
      }

      // check for a named property
      let property: string | undefined;
      if (pipeline.pipeline) {
        log('using .pipeline property');
        property = '.pipeline';
        pipeline = pipeline.pipeline;
        // check for a default property
      } else if (pipeline.default) {
        property = '.default';
        log('using .default property');
        pipeline = pipeline.default;
      } else {
        log('using module');
        property = '.default';
      }

      // execute the factory function if pipeline is a factory
      if (typeof pipeline === 'function') {
        log('executing pipeline factory');
        try {
          pipeline = await pipeline();
        } catch (error) {
          console.error();
          console.error(`💥 ERROR`);
          console.error();
          console.error(
            `An error occurred whilst executing "${file}#${property}()"`,
          );
          console.error();
          console.error(error);
          process.exitCode = 1;
          return;
        }
      }

      // build the pipeline if its a builder
      if (isPipelineBuilder(pipeline)) {
        log('building pipeline');
        pipeline = await pipeline.build();
      }

      // validate
      log('validating pipeline');
      const errors = await validate(pipeline);
      if (errors.length) {
        console.error();
        console.error(`👮‍♀️ The pipeline is not valid:`);
        console.error();
        for (const error of errors) {
          console.error(error);
        }
        if (!argv.ignoreValidationErrors) {
          process.exitCode = 1;
          return;
        }
      }

      log('stringifying pipeline');
      console.log(await stringify(pipeline));
    },
  ).argv;
})();
