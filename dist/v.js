(function(mod) {
	if (typeof exports === 'object' && typeof module === 'object')
		module.exports = mod();
	else if (typeof define === 'function' && define.amd)
		return define([], mod);
	else
		this.V = mod();
})(function() {
	'use strict';
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

function common(condition){
    "use strict";

    return function(){
        var args = Array.prototype.slice.call(arguments);

        return function(val){
            return (
                this && this.message ?
                condition.bind({message: this.message}) :
                condition
                )(
                    args.map(function(fn){
                        return fn(val);
                    }
                )
            );
        };
    };
}

function initValidators(baseValidatorFunctions, validators){
    "use strict";

    var _V = Object.create(baseValidatorFunctions);



    Object.keys(validators).forEach(function(key){
        _V[key] = function(){
            var args = Array.prototype.slice.call(arguments);

            return function(val){
                if(this && this.message) args.push(this.message);

                return validators[key].apply(null, [val].concat(args));
            };
        };
    });

    return _V;
}
function formatMessage (message, args) {
    "use strict";

    var ind = 0;

    return args ? message.replace(/%s/g, function(){
        return args[ind++];
    }) : message;
}

function getValidators() {
    "use strict";

    return {
        email : function(val, message){
            var reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

            return reg.test(val) || message || "invalid email";
        },
        range: function(val, min, max, message) {

            message = message || "string length should be between %s and %s chars";

            if (!val || val.length < min || val.length > max) {
                return formatMessage(message, Array.prototype.splice.call(arguments, 1, 2));
            }

            return true;
        },
        capitalLetter: function(val, message){
            return /^[A-Z]/.test(val) || message || "first letter should be capital";
        },
        text: function(val, message){
            return /^[a-z]+$/ig.test(val) || message || "should be a text only";
        },
        url: function(val, message){
            return /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/.test(val) || message || 'url string is invalid';
        },
        word: function(val, message) {
            return /^\w+$/.test(val) || message || 'word string is invalid';
        },
        required: function(val, message){
            return !!(val && val.length) || message || 'the field is required';
        },
        phone: function(val, message){
            return !!(/^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(val)) || message || 'the field is required';
        },
        date: function(val, format, message) {
            var _format = format.split(/\s|-|\.|\//),
                regParts = _format.map(function(part){
                    return '[\\d]{'+ part.length +'}';
                }),
                formatspaces = [].concat(format.match(new RegExp(_format.join('(.*)'), 'i'))).splice(1);
            
            var finalRegExStr = regParts.join('~').replace(/~/g, function(){
                var space = formatspaces.shift();
                if (space === '.') space = '\\' + space;
                return formatspaces ? space : '\\/';
            });

            return !!(new RegExp(finalRegExStr).test(val)) || message || 'wrong date format';
        },
        time: function(val, format, message){}
    };
}
	return initValidators(getBaseValidatorFunctions(), getValidators());
});