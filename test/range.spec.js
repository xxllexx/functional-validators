describe("Range Validator spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("String should be valid", function() {

        var string = '0123456789';

        expect(V.range(1, 10)(string)).toBeTruthy();
    });

    it("String should be invalid", function() {

        var string = '012345678910';

        expect(V.range(1, 10)(string)).not.toEqual(true);

    });
});
