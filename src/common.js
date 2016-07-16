export default function (condition) {
  return (...args) => (function (val) {
    return (
        this && this.message ?
        condition.bind({ message: this.message }) :
        condition
        )(
          args.map(fn => fn(val))
        );
  });
}
