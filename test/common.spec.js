import expect from 'expect';
import common from '../src/common';

describe('common builder function ', () => {
  it('should create function', () => {
    const result = common(val => val);
    const resultOfResult = result(() => 123);
    const finalResult = resultOfResult();

    expect(typeof result).toBe('function');
    expect(typeof resultOfResult).toBe('function');
    expect(finalResult).toEqual([123]);
  });
});
