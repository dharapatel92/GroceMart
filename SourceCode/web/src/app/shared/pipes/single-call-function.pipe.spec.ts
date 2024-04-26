import { SingleCallFunctionPipe } from './single-call-function.pipe';

describe('SingleCallFunctionPipe', () => {
  it('create an instance', () => {
    const pipe = new SingleCallFunctionPipe();
    expect(pipe).toBeTruthy();
  });
});
