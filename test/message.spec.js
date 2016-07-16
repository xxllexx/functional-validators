import expect from 'expect';
import V from '../src';
import formatMessage from '../src/messageFormatter';

describe('Message formatter', () => {
  it('should be correctly formatted with args', () => {
    const message = '%s test message that has args inside %s';
    const args = ['Hello this is', 'like this'];

    expect(formatMessage(message, args))
      .toEqual('Hello this is test message that has args inside like this');
  });

  it('should be correctly formatted without args', () => {
    const message = '%s test message that has args inside %s';
    expect(formatMessage(message)).toEqual('%s test message that has args inside %s');
  });

  it('should be correctly formatted without replacement signs', () => {
    const message = 'test message that has args inside';
    const args = ['Hello this is', 'like this'];

    expect(formatMessage(message, args)).toEqual('test message that has args inside');
  });

  it('Validator should return correct message', () => {
    const emailValidator = V.email();
    const emailValidatorWithMessage = V.message(emailValidator, 'your email is invalid');
    const incorrectEmail = 'k.alex.s@someemaildomain';

    expect(emailValidatorWithMessage(incorrectEmail)).toEqual('your email is invalid');
  });
});
