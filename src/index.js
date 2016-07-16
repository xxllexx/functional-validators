import base from './base';
import * as validators from './validators';

export default {
  ...base,
  ...Object.keys(validators).reduce((acc, validatorName) => {
    /*eslint-disable*/
    acc[validatorName] = (...args) => {
      return function(val) {
        if(this && this.message) args.push(this.message);
        return validators[validatorName](
          val,
          ...(this && this.message ? [...args, this.message] : [...args])
        )
      };
    };

    return acc;
    /*eslint-enable*/
  }, {}),
};
