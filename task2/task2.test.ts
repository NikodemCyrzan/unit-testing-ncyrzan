import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {
  it("is valid when quantity doesn't exceed threshold", () => {
    const validator = new QuantityValidator(10, 5);

    const result = validator.validate(9);
    expect(result).toBe(true);
  });

  it('is valid when quantity exceeds threshold and is divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);

    const result = validator.validate(10);
    expect(result.isValid).toBe(true);
  });

  it('is not valid when quantity exceeds threshold and is not divisible by packageSize', () => {
    const validator = new QuantityValidator(10, 5);

    const result = validator.validate(11);
    expect(result.isValid).toBe(false);
  });

  it('returns error when not valid', () => {
    const validator = new QuantityValidator(5, 5);

    const result = validator.validate(9);
    expect(result.error).toBe('Quantity should be divisible by 5');
  });

  it("doesn't return error when valid", () => {
    const validator = new QuantityValidator(5, 5);

    const result = validator.validate(5);
    expect(result.error).toBe(null);
  });

  it('is not valid when quantity <= 0', () => {
    const validator = new QuantityValidator(10, 5);

    const result = validator.validate(0);
    expect(result.isValid).toBe(false);
  });
});
