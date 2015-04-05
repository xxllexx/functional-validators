describe("Capital Letter spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("String should be a valid url", function() {
        var string = 'http://google.com',
            string1 = 'https://google.com.ua',
            string2 = 'https://google.com.ua:8080';

        expect(V.url()(string)).toBeTruthy();
        expect(V.url()(string1)).toBeTruthy();
        expect(V.url()(string2)).toBeTruthy();
    });

    it("String should be invalid", function() {
        var string = 'htt://google.com';
        expect(V.url()(string)).not.toEqual(true);
    });
});
