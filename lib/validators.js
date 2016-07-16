'use strict';

exports.__esModule = true;
exports.number = number;
exports.email = email;
exports.range = range;
exports.capitalLetter = capitalLetter;
exports.text = text;
exports.url = url;
exports.word = word;
exports.required = required;
exports.phone = phone;
exports.date = date;

var _messageFormatter = require('./messageFormatter');

var _messageFormatter2 = _interopRequireDefault(_messageFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function number(val, message) {
  return (/^[0-9.,]+$/.test(val) || message || 'invalid number'
  );
}

function email(val, message) {
  /*eslint-disable */
  var reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  /*eslint-enable */
  return reg.test(val) || message || 'invalid email';
}

function range(val, min, max, message) {
  var defaultMessage = message || 'string length should be between %s and %s chars';

  if (!val || val.length < min || val.length > max) {
    /*eslint-disable */
    return (0, _messageFormatter2['default'])(defaultMessage, Array.prototype.splice.call(arguments, 1, 2));
    /*eslint-enable */
  }

  return true;
}

function capitalLetter(val, message) {
  return (/^[A-Z]/.test(val) || message || 'first letter should be capital'
  );
}

function text(val, message) {
  return (/^[a-z]+$/ig.test(val) || message || 'should be a text only'
  );
}

function url(val, message) {
  /*eslint-disable */
  return (/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/.test(val) || message || 'url string is invalid'
  );
  /*eslint-enable */
}

function word(val, message) {
  return (/^\w+$/.test(val) || message || 'word string is invalid'
  );
}

function required(val, message) {
  return val != null && (typeof val === 'number' || typeof val === 'string' && !!val || Array.isArray(val) && !!val.length || typeof val === 'object' && Object.keys(val).filter(function (v) {
    return val[v] != null;
  }).some(function (v) {
    return !!v;
  })) || message || 'the field is required';
}

function phone(val, message) {
  return !!/^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(val) || message || 'the field is required';
}

function date(val, format, message) {
  var formatArr = format.split(/\s|-|\.|\//);
  var regParts = formatArr.map(function (part) {
    return '[\\d]{' + part.length + '}';
  });
  var formatspaces = [].concat(format.match(new RegExp(formatArr.join('(.*)'), 'i'))).splice(1);
  var finalRegExStr = regParts.join('~').replace(/~/g, function () {
    var space = formatspaces.shift();
    if (space === '.') space = '\\' + space;
    return formatspaces ? space : '\\/';
  });

  return !!new RegExp(finalRegExStr).test(val) || message || 'wrong date format';
}