import {CommandStep} from '../lib/builders/CommandStep';
import {GroupStep} from '../lib/builders/GroupStep';
import {Pipeline} from '../lib/builders/Pipeline';
import {findFirstStep, findSteps} from './findSteps';

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
    const steps = findSteps(simpleBuildAndDeployPipeline, (step) => {
      return (
        step instanceof CommandStep &&
        step.getLabel()?.startsWith('Deploying') === true
      );
    });

    expect(steps).toEqual([deployAppAStep, deployAppBStep]);
  });

  test('does not find steps which do not match the predicate', () => {
    const steps = findSteps(simpleBuildAndDeployPipeline, (step) => {
      return (
        step instanceof CommandStep &&
        step.getLabel()?.startsWith('Publishing package') === true
      );
    });

    expect(steps).toEqual([]);
  });

  test('recursively finds nested steps which match the predicate when recursive=true', () => {
    const steps = findSteps(
      nestedPipeline,
      (step) => {
        return (
          step instanceof CommandStep &&
          step.getLabel()?.startsWith('Deploying') === true
        );
      },
      {recursive: true},
    );

    expect(steps).toEqual([deployAppAStep, deployAppBStep]);
  });
});
