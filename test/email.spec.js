describe("Email Validator spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("Email should be valid", function() {

        var email = 'k.alexey.s@gmail.com';

        expect(V.email()(email)).toBeTruthy();
    });

    it("Email should be invalid", function() {

        var email = 'k.alexey.s@gmailcom';

        expect(V.email()(email)).not.toEqual(true);
    });
});
