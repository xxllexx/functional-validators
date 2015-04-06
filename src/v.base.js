function getBaseValidatorFunctions () {
    "use strict";

    return {
        or: common(function(validationArray){
            return !validationArray.some(function(item){
                return item === true;
            }) ? ((this && this.message) || [].concat.apply([], validationArray.filter(function(item){
                return item !== true;
            }))) : true;
        }),
        and: common(function(validationArray){
            return !validationArray.every(function(item){
                return item === true;
            }) ? ((this && this.message) || [].concat.apply([], validationArray.filter(function(item){
                return item !== true;
            }))) : true;
        }),
        message: function(fn, message){
            return fn.bind({
                message: message
            });
        },
        register: function(validatorName, validatorExpression, force){
            if (!(validatorName in this) || force) {
                this[validatorName] = function(){
                    var args = Array.prototype.slice.call(arguments);
                    return function(val){
                        if (this && this.message) args.push(this.message);
                        return validatorExpression.apply(null, [val].concat(args));
                    };
                };
            } else {
                throw new Error('Validator with this name already exists! To rewrite validator, put third parameter eq. "true"');
            }
        }
    };
}
