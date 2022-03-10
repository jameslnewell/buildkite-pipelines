import { WaitStep } from "./WaitStep";

describe('WaitStep', () => {
  describe('.wait', () => {
    const wait = new WaitStep();
      expect(wait.build()).toHaveProperty('wait', null)
  })
  describe('.continue_on_failure', () => {
    test('defaults to undefined' , () => {
      const wait = new WaitStep();
      expect(wait.build()).toHaveProperty('continue_on_failure', undefined)
    })
    test('set to true when passed to the constructor' , () => {
      const wait = new WaitStep({
        continueOnFailure: true
      });
      expect(wait.build()).toHaveProperty('continue_on_failure', true)
    })
    test('set to false when passed to the constructor' , () => {
      const wait = new WaitStep({
        continueOnFailure: false
      });
      expect(wait.build()).toHaveProperty('continue_on_failure', false)
    })
    test('set to true when set on the object' , () => {
      const wait = new WaitStep();
      wait.continueOnFailure =  true
      expect(wait.build()).toHaveProperty('continue_on_failure', true)
    })
    test('set to false when set on the object' , () => {
      const wait = new WaitStep();
      wait.continueOnFailure = false
      expect(wait.build()).toHaveProperty('continue_on_failure', false)
    })
    test('set to false when passed to the constructor and then set on the object' , () => {
      const wait = new WaitStep({
        continueOnFailure: true
      });
      wait.continueOnFailure = false
      expect(wait.build()).toHaveProperty('continue_on_failure', false)
    })
  })
  
})