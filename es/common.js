export default function (condition) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (val) {
      return (this && this.message ? condition.bind({ message: this.message }) : condition)(args.map(function (fn) {
        return fn(val);
      }));
    };
  };
}