
'use strict';

function formatMessage (message, args) {
	var ind = 0;

	return args ? message.replace(/%s/g, function(match){
		return args[ind++];
	}) : message;
}

var validators = {
	'email' : function(val, message){
		var reg = /^[\w-']+(\.[\w-']+)*@([a-zA-Z0-9]+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

        return reg.test(val) || message || "invalid email";
    },
    'range': function(val, min, max, message) {
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
    }
};

var common = function(condition){
	return function(){
    	var args = Array.prototype.slice.call(arguments);

    	return function(val){

    		var  self = this;

            var isValid = args.map(function(fn){
            	return fn(val);
            });

            return (this && this.message ? condition.bind({message: this.message}) : condition)(isValid);
        };
    };
};

var V = {
    or: common(function(validationArray){
    	return !validationArray.some(function(item){
            return item === true;
        }) ? ((this && this.message) || [].concat.apply([], validationArray.filter(function(item){
            return item !== true;
        }))) : true;

    }),
    and: common(function(validationArray){
        return validationArray.some(function(item){
            return item !== true;
        }) ? ((this && this.message) || [].concat.apply([], validationArray.filter(function(item){
            return item !== true;
        }))) : true;
    }),
    message: function(fn, message){
    	return fn.bind({message: message});
    }
};

Object.keys(validators).forEach(function(key){
    V[key] = function(){
        var args = Array.prototype.slice.call(arguments);

        return function(val){
        	if(this && this.message) args.push(this.message);

            return validators[key].apply(null, [val].concat(args));
        };
    };
});

    // V.message.text()
    // V.message.email()
    // V.message.capitalLetter()



// console.log(V);

// var m = V.range(3, 5);

// var c = V.email();

// var l = V.capitalLetter();
// var t = V.text();
// var t2 = V.text();

// var t = V.message(V.text(), "message here");

// console.log(t('123123'), t2('asdasd'));



var or = V.or( V.and(V.email(), V.message( V.range(3, 5) , 'message fucking it' )) , V.message(V.capitalLetter(), 'sdfsdf')); //function or(value) -> true || false

console.log("or", or('easdqwe.we'));


// var and = V.and(V.email(), V.range(3, 5)); //function and(value) -> true || false
// var or = V.or(V.range(3, 5), V.email());
// var and = V.and(V.range(1, 5), V.email());

// var andOr = V.or(V.and(V.range(1, 10), V.email()), V.and(V.capitalLetter(), V.text()));

// var k = V.or(V.range(1, 5), function(){
// 	return "error";
// });

// console.log("custom", k('fasdf'));

// console.log("and", and('fasdf'));
// console.log("andOr", andOr('Cas@qwe.we'));


// V.and(arg...);


// V.email()
// V.range(10, 24);


// V.and(email(), range(10, 24))



// var email = function(){

// 	return function(){
// 		//doValidation	
// 	}
// }

// var range = function(arg, arg1){
// 	var args = arguments;
// 	return function(){

// 		//doValidation(args)	
// 	}
// }

// V.validate(V.or())






