"use strict";

exports.__esModule = true;

exports["default"] = function (message, args) {
  var ind = 0;

  return args ? message.replace(/%s/g, function () {
    return args[ind++];
  }) : message;
};