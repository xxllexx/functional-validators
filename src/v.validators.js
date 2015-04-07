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