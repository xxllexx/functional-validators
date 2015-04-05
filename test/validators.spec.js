describe("Main Validator spec", function() {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                    return fToBind.apply(this instanceof fNOP
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }


    var V = initValidators(getBaseValidatorFunctions(), getValidators()),
        correctEmail = "k.alexey.s@gmail.com",
        incorrectEmail = "k.alex.s@someemaildomain";

    it("Validator lib should be defined", function() {
        expect(Object.keys(V).length).toBeTruthy();
    });

    it("Validator should be created", function(){
        var emailValidator = V.email();
        expect(emailValidator).toBeDefined();
    });

    it("Email Validator should correctly validate emails", function(){
        var emailValidator = V.email();

        expect(emailValidator(correctEmail)).toBeTruthy();
        expect(emailValidator(incorrectEmail)).not.toEqual(true);
    });

    it("Email Validator should return correct message", function(){
        var emailValidator = V.email(),
            emailValidatorWithMessage = V.message(emailValidator, "your email is invalid");

        expect(emailValidatorWithMessage(incorrectEmail)).toEqual("your email is invalid");
    });

    it("Range Validator should return correct message", function(){
        var rangeValidator = V.range(3, 5),
            rangeValidatorWithMessage = V.message(V.range(3, 5), "string length should be between %s and %s");

        expect(rangeValidatorWithMessage('qw')).toEqual("string length should be between 3 and 5");
        expect(rangeValidator('qw')).toEqual("string length should be between 3 and 5 chars");
    });

    it("Group with validators, AND function", function(){
        var firstValidator = V.email(),
            secondValidator = V.range(3, 10),
            andValidator = V.and(firstValidator, secondValidator);

        var correctValidatorData = "qwr@wer.er",
            incorrectLengthValidatorData = "qwre@wer.ere",
            incorrectEmailValidatorData = "qwrwer.er",
            incorrectAllValidatorData = "qwrwer.erqwq";

        expect(andValidator(correctValidatorData)).toBeTruthy();
        expect(andValidator(incorrectLengthValidatorData).length).toBeTruthy();
        expect(andValidator(incorrectEmailValidatorData).length).toBeTruthy();
        expect(andValidator(incorrectAllValidatorData).length).toEqual(2);
    });

    it("Group with validators, OR function", function(){
        var firstValidator = V.email(),
            secondValidator = V.range(3, 10),
            andValidator = V.or(firstValidator, secondValidator);

        var correctValidatorData = "qwr@wer.er",
            incorrectLengthValidatorData = "qwre@wer.ere",
            incorrectEmailValidatorData = "qwrwer.er",
            incorrectAllValidatorData = "qwrwer.erqwq";

        expect(andValidator(correctValidatorData)).toBeTruthy();
        expect(andValidator(incorrectLengthValidatorData)).toBeTruthy();
        expect(andValidator(incorrectEmailValidatorData)).toBeTruthy();
        expect(andValidator(incorrectAllValidatorData).length).toEqual(2);
    });

    it("Group with validators, custom error message", function(){
        var firstValidator = V.email(),
            secondValidator = V.range(3, 10),
            andValidator = V.message(V.or(firstValidator, secondValidator), 'error message');

        var incorrectAllValidatorData = "qwrwer.erqwq";

        expect(andValidator(incorrectAllValidatorData)).toEqual('error message');
    });

});

