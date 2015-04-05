describe("Init Validator spec", function() {

    var _validators, _baseFunctions;

    beforeEach(function(){

        _validators = {
            email: "email validator"
        };

        _baseFunctions = {
            or: "or function"
        };
    });

    it("validators object should have base functions", function() {

        var validators = initValidators(_baseFunctions, _validators);

        expect('or' in validators).toBeTruthy();
    });

    it("validators object should have validator functions", function() {

        var validators = initValidators(_baseFunctions, _validators);

        expect('email' in validators).toBeTruthy();
    });

});
