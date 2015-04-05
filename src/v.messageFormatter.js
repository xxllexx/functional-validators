function formatMessage (message, args) {
    "use strict";

    var ind = 0;

    return args ? message.replace(/%s/g, function(){
        return args[ind++];
    }) : message;
}
