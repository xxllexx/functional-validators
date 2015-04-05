describe("Capital Letter spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("String should be valid", function() {

        var string = 'Test string';
        expect(V.capitalLetter()(string)).toBeTruthy();
    });

    it("String should be invalid", function() {

        var string = 'invalid string';
        expect(V.capitalLetter()(string)).not.toEqual(true);

    });
});
