export default function (message, args) {
  let ind = 0;

  return args ? message.replace(/%s/g, () => {
    return args[ind++];
  }) : message;
}
