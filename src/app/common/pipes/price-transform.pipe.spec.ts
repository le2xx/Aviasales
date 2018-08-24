import { PriceTransformPipe } from './price-transform.pipe';

describe('PriceTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
