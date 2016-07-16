import formatMessage from './messageFormatter';

export function number(val, message) {
  return (/^[0-9.,]+$/.test(val) || message || 'invalid number'
  );
}

export function email(val, message) {
  /*eslint-disable */
  var reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  /*eslint-enable */
  return reg.test(val) || message || 'invalid email';
}

export function range(val, min, max, message) {
  var defaultMessage = message || 'string length should be between %s and %s chars';

  if (!val || val.length < min || val.length > max) {
    /*eslint-disable */
    return formatMessage(defaultMessage, Array.prototype.splice.call(arguments, 1, 2));
    /*eslint-enable */
  }

  return true;
}

export function capitalLetter(val, message) {
  return (/^[A-Z]/.test(val) || message || 'first letter should be capital'
  );
}

export function text(val, message) {
  return (/^[a-z]+$/ig.test(val) || message || 'should be a text only'
  );
}

export function url(val, message) {
  /*eslint-disable */
  return (/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/.test(val) || message || 'url string is invalid'
  );
  /*eslint-enable */
}

export function word(val, message) {
  return (/^\w+$/.test(val) || message || 'word string is invalid'
  );
}

export function required(val, message) {
  return val != null && (typeof val === 'number' || typeof val === 'string' && !!val || Array.isArray(val) && !!val.length || typeof val === 'object' && Object.keys(val).filter(function (v) {
    return val[v] != null;
  }).some(function (v) {
    return !!v;
  })) || message || 'the field is required';
}

export function phone(val, message) {
  return !!/^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(val) || message || 'the field is required';
}

export function date(val, format, message) {
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