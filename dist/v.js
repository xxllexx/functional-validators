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
            var reg = /^[\w-']+(\.[\w-']+)*@([a-zA-Z0-9]+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

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
            return /^[A-Z].*/.test(val) || message || "first letter should be capital";
        },
        text: function(val, message){
            return /^[a-z]+$/ig.test(val) || message || "should be a text only";
        },
        url: function(val, message){
            return /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/.test(val) || message || 'url string is invalid';
        }
    };
}
	return initValidators(getBaseValidatorFunctions(), getValidators());
});