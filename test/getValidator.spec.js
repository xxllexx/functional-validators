describe("Get Validators", function() {
    it("Should return validators list", function() {
        var validators = getValidators();
        expect(Object.keys(validators).length).toBeTruthy();
    });
});
