'use strict';

exports.__esModule = true;

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var or = (0, _common2['default'])(function (validationArray) {
  return !validationArray.some(function (item) {
    return item === true;
  }) ? this && this.message || [].concat(validationArray.filter(function (item) {
    return item !== true;
  })) : true;
});

var and = (0, _common2['default'])(function (validationArray) {
  return !validationArray.every(function (item) {
    return item === true;
  }) ? this && this.message || [].concat(validationArray.filter(function (item) {
    return item !== true;
  })) : true;
});

var message = function message(fn, mess) {
  return fn.bind({
    message: mess
  });
};

var register = function register(validatorName, validatorExpression, force) {
  if (!(validatorName in this) || force) {
    this[validatorName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return function (val) {
        if (this && this.message) args.push(this.message);
        return validatorExpression.apply(undefined, [val].concat(this && this.message ? [].concat(args, [this.message]) : [].concat(args)));
      };
    };
  } else {
    throw new Error('Validator with this name already exists! ' + 'To rewrite validator, put third parameter eq. "true"');
  }
};

exports['default'] = {
  and: and,
  or: or,
  message: message,
  register: register
};