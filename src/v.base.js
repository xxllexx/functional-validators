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
