describe("Word spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    function wordValidate(value) {
        return V.word()(value);
    }

    it("String should be a one word only", function() {
        var strings = [
            'Test',
            'Test123',
            '123Test43',
            'test-test',
            'Test_test'
        ];

        function expectTrue(value) {
            return expect(value).toBeTruthy();
        }

        strings.map(wordValidate).map(expectTrue);
    });

    it("String should not be several words commas, spec chars or spaces", function() {
        var strings = [
            '123 qwe',
            '123,',
            'Test.Af'
        ];

        function expectFalse(value) {
            return expect(value).not.toEqual(true);
        }

        strings.map(wordValidate).map(expectFalse);
    });
});
