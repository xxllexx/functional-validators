describe("Word spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("isRequired should be true", function() {
        var values = [123, 123.231, 0, "123", [123], {test: 123}];

        expect(values.map(function(f){
            return V.required()(f);
        }).every(function(v){
            return v === true;
        })).toBeTruthy()
    });

    it("isRequired should be false", function() {
        var values = ["", null, [], {}];

        expect(values.map(function(f){
            return V.required()(f);
        }).every(function(v){
            return v !== true;
        })).toBeTruthy()
    });
});
