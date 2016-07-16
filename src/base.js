import common from './common';

const or = common(function (validationArray) {
  return !validationArray.some(item => item === true)
    ? ((this && this.message) || [...validationArray.filter(item => item !== true)])
    : true;
});

const and = common(function (validationArray) {
  return !validationArray.every(item => item === true)
    ? ((this && this.message) || [...validationArray.filter(item => item !== true)])
    : true;
});

const message = function (fn, mess) {
  return fn.bind({
    message: mess,
  });
};

const register = function (validatorName, validatorExpression, force) {
  if (!(validatorName in this) || force) {
    this[validatorName] = function (...args) {
      return function (val) {
        if (this && this.message) args.push(this.message);
        return validatorExpression(...[
          val,
          ...(this && this.message ? [...args, this.message] : [...args])]);
      };
    };
  } else {
    throw new Error(
      'Validator with this name already exists! ' +
      'To rewrite validator, put third parameter eq. "true"'
    );
  }
};

export default {
  and,
  or,
  message,
  register,
};
