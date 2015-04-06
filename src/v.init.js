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