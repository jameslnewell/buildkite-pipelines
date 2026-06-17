import {CommandStep, GroupStep, Pipeline} from '../lib/index.js';
import {findFirstStep, findSteps} from './findSteps.js';

const buildAppAStep = new CommandStep()
  .setLabel('Building A')
  .addCommand('docker build -f Dockerfile.a');
const buildAppBStep = new CommandStep()
  .setLabel('Building B')
  .addCommand('docker build -f Dockerfile.b');
const deployAppAStep = new CommandStep()
  .setLabel('Deploying A')
  .addCommand('deploy image a');
const deployAppBStep = new CommandStep()
  .setLabel('Deploying B')
  .addCommand('deploy image b');

const simpleBuildAndDeployPipeline = new Pipeline().addSteps([
  buildAppAStep,
  buildAppBStep,
  deployAppAStep,
  deployAppBStep,
]);

const nestedPipeline = new Pipeline().addSteps([
  new GroupStep().setLabel('Building').addSteps([buildAppAStep, buildAppBStep]),
  new GroupStep()
    .setLabel('Deploying')
    .addSteps([deployAppAStep, deployAppBStep]),
]);

describe(findSteps, () => {
  test('finds steps which match the predicate', () => {
    const steps = findSteps(
      simpleBuildAndDeployPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
    );

    expect(steps).toEqual([deployAppAStep, deployAppBStep]);
  });

  test('does not find steps which do not match the predicate', () => {
    const steps = findSteps(
      simpleBuildAndDeployPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Publishing package') === true
        );
      },
    );

    expect(steps).toEqual([]);
  });

  test('recursively finds nested steps which match the predicate when recursive=true', () => {
    const steps = findSteps(
      nestedPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
      {recursive: true},
    );

    expect(steps).toEqual([deployAppAStep, deployAppBStep]);
  });

  test('does not find nested steps which match the predicate when recursive=false', () => {
    const steps = findSteps(
      nestedPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
      {recursive: false},
    );

    expect(steps).toEqual([]);
  });

  test('finds the child steps when given a group directly', () => {
    const group = new GroupStep()
      .setLabel('Deploying')
      .addSteps([deployAppAStep, deployAppBStep]);

    const steps = findSteps(
      group,
      (step): step is CommandStep => step instanceof CommandStep,
    );

    expect(steps).toEqual([deployAppAStep, deployAppBStep]);
  });
});

describe(findFirstStep, () => {
  test('finds the first step which matches the predicate', () => {
    const step = findFirstStep(
      simpleBuildAndDeployPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
    );

    expect(step).toEqual(deployAppAStep);
  });
  test('does not find a step which do not match the predicate', () => {
    const step = findFirstStep(
      simpleBuildAndDeployPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Publishing package') === true
        );
      },
    );

    expect(step).toBeUndefined();
  });

  test('recursively finds nested steps which match the predicate when recursive=true', () => {
    const step = findFirstStep(
      nestedPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
      {recursive: true},
    );

    expect(step).toEqual(deployAppAStep);
  });

  test('does not find nested steps which match the predicate when recursive=false', () => {
    const step = findFirstStep(
      nestedPipeline,
      (step): step is CommandStep => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
      {recursive: false},
    );

    expect(step).toBeUndefined();
  });

  test('finds the first child step when given a group directly', () => {
    const group = new GroupStep()
      .setLabel('Deploying')
      .addSteps([deployAppAStep, deployAppBStep]);

    const step = findFirstStep(
      group,
      (step): step is CommandStep => step instanceof CommandStep,
    );

    expect(step).toEqual(deployAppAStep);
  });
});
