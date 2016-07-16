var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import base from './base';
import * as validators from './validators';

export default _extends({}, base, Object.keys(validators).reduce(function (acc, validatorName) {
  /*eslint-disable*/
  acc[validatorName] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (val) {
      if (this && this.message) args.push(this.message);
      return validators[validatorName].apply(validators, [val].concat(this && this.message ? [].concat(args, [this.message]) : [].concat(args)));
    };
  };

  return acc;
  /*eslint-enable*/
}, {}));