describe("Word spec", function() {

    var V = initValidators(getBaseValidatorFunctions(), getValidators());

    it("date should be should be correct", function() {
        var formats = [
            'MM/Dd/yyyy',
            'mm dd yyyy',
            'dd-m.yy',
            'yyyy.m.dd'
        ];

        var dates = [
            '02/11/1984',
            '02 11 1984',
            '11-2.84',
            '1984.2.11'
        ];



        formats.map(function(f){
            return V.date(f);
        }).map(function(v, i){
            expect(v(dates[i])).toBeTruthy();
        })
    });

    it("date should be should not be correct", function() {
        var formats = [
            'MM/Dd/yyyy',
            'mm dd yyyy',
            'dd-m.yy',
            'yyyy.m.dd'
        ];

        var dates = [
            '02/1984/11',
            '02 32 12',
            '11/2.84',
            '1984-2-11'
        ];

        formats.map(function(f){
            return V.date(f);
        }).map(function(v, i){
                expect(v(dates[i])).not.toEqual(true);
        })
    });
});
