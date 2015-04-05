describe("Text spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("String should contain text only", function() {

        var string = 'Teststring';
        expect(V.text()(string)).toBeTruthy();
    });

    it("String should not contain text only", function() {

        var string = '123qwe ';
        expect(V.text()(string)).not.toEqual(true);

    });
});
