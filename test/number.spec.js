describe("Number spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("should be a number", function() {

        var number = 1234;
        expect(V.number()(number)).toBeTruthy();
    });

    it("should be a floating number", function() {

        var number = 123.4;
        expect(V.number()(number)).toBeTruthy();
    });

    it("should be not a number", function() {

        var string = 'qwe';
        expect(V.number()(string)).not.toEqual(true);

    });
});
