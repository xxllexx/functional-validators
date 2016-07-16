import expect from 'expect';
import V from '../src';

describe('Lib', () => {
  it('should create EMAIL validator', () => {
    const emailValidator = V.email();

    expect(emailValidator('email@domain.com')).toBe(true);
    expect(emailValidator('emaildomain.com')).toBe('invalid email');
  });

  it('should create AND group', () => {
    const emailValidator = V.email();
    const rangeValidator = V.range(1, 17);
    const groupANDValidator = V.and(emailValidator, rangeValidator);

    expect(groupANDValidator('email@domain.com')).toBe(true);

    expect(groupANDValidator('email@domainand.com'))
      .toEqual(['string length should be between 1 and 17 chars']);

    expect(groupANDValidator('emaildomainand.com'))
      .toEqual(['invalid email', 'string length should be between 1 and 17 chars']);
  });

  it('should create OR group', () => {
    const firstValidator = V.email();
    const secondValidator = V.range(3, 10);
    const andValidator = V.or(firstValidator, secondValidator);

    const correctValidatorData = 'qwr@wer.er';
    const incorrectLengthValidatorData = 'qwre@wer.ere';
    const incorrectEmailValidatorData = 'qwrwer.er';
    const incorrectAllValidatorData = 'qwrwer.erqwq';

    expect(andValidator(correctValidatorData)).toBe(true);
    expect(andValidator(incorrectLengthValidatorData)).toBe(true);
    expect(andValidator(incorrectEmailValidatorData)).toBe(true);
    expect(andValidator(incorrectAllValidatorData).length).toEqual(2);
  });

  it('should group validators with custom error message', () => {
    const firstValidator = V.email();
    const secondValidator = V.range(3, 10);
    const andValidator = V.message(V.or(firstValidator, secondValidator), 'error message');
    const incorrectAllValidatorData = 'qwrwer.erqwq';

    expect(andValidator(incorrectAllValidatorData)).toEqual('error message');
  });

  it('should register new validator', () => {
    const validatorName = 'customValidator';
    const validatorFunction = () => true;

    V.register(validatorName, validatorFunction);
    const valid = V[validatorName]();

    expect(valid()).toBe(true);
  });

  it('should not override validator', () => {
    const validatorName = 'email';
    const validatorFunction = () => true;
    expect(() => { V.register(validatorName, validatorFunction); }).toThrow(/^Validator with this/);
  });

  it('should override validator with third param', () => {
    const validatorName = 'customValidator';
    const validatorFunction = () => false;

    V.register(validatorName, validatorFunction, true);
    const valid = V[validatorName]();

    expect(valid()).toBe(false);
  });
});
