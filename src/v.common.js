function common(condition){
    "use strict";

    return function(){
        var args = Array.prototype.slice.call(arguments);

        return function(val){
            return (
                this && this.message ?
                condition.bind({message: this.message}) :
                condition
                )(
                    args.map(function(fn){
                        return fn(val);
                    }
                )
            );
        };
    };
}
