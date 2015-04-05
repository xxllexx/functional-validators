describe("Get Base Functions", function() {
    it("Should return base functions list", function() {
        var baseFn = getBaseValidatorFunctions();
        expect(Object.keys(baseFn).length).toBeTruthy();
    });
});
