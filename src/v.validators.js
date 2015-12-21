function getValidators() {
    "use strict";

    return {
        number: function(val, message){
            return /^[0-9.,]+$/.test(val) || message || "invalid number";
        },
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
            return !!(val) || message || 'the field is required';
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