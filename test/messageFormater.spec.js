describe("Message  formatter", function() {

    it("Message should be correctly formatted with args", function() {

        var message = "%s test message that has args inside %s",
            args = ["Hello this is", "like this"];

        expect(formatMessage(message, args)).toEqual("Hello this is test message that has args inside like this");

    });

    it("Message should be correctly formatted without args", function() {

        var message = "%s test message that has args inside %s";

        expect(formatMessage(message)).toEqual("%s test message that has args inside %s");

    });

    it("Message should be correctly formatted without replacement signs", function() {

        var message = "test message that has args inside",
            args = ["Hello this is", "like this"];

        expect(formatMessage(message, args)).toEqual("test message that has args inside");

    });

});
