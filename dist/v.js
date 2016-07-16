(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["V"] = factory();
	else
		root["V"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _base = __webpack_require__(1);

	var _base2 = _interopRequireDefault(_base);

	var _validators = __webpack_require__(4);

	var validators = _interopRequireWildcard(_validators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = _extends({}, _base2['default'], Object.keys(validators).reduce(function (acc, validatorName) {
	  /*eslint-disable*/
	  acc[validatorName] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return function (val) {
	      if (this && this.message) args.push(this.message);
	      return validators[validatorName].apply(validators, [val].concat(this && this.message ? [].concat(args, [this.message]) : [].concat(args)));
	    };
	  };

	  return acc;
	  /*eslint-enable*/
	}, {}));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _common = __webpack_require__(2);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var or = (0, _common2['default'])(function (validationArray) {
	  return !validationArray.some(function (item) {
	    return item === true;
	  }) ? this && this.message || [].concat(validationArray.filter(function (item) {
	    return item !== true;
	  })) : true;
	});

	var and = (0, _common2['default'])(function (validationArray) {
	  return !validationArray.every(function (item) {
	    return item === true;
	  }) ? this && this.message || [].concat(validationArray.filter(function (item) {
	    return item !== true;
	  })) : true;
	});

	var message = function message(fn, mess) {
	  return fn.bind({
	    message: mess
	  });
	};

	var register = function register(validatorName, validatorExpression, force) {
	  if (!(validatorName in this) || force) {
	    this[validatorName] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return function (val) {
	        if (this && this.message) args.push(this.message);
	        return validatorExpression.apply(undefined, [val].concat(this && this.message ? [].concat(args, [this.message]) : [].concat(args)));
	      };
	    };
	  } else {
	    throw new Error('Validator with this name already exists! ' + 'To rewrite validator, put third parameter eq. "true"');
	  }
	};

	exports['default'] = {
	  and: and,
	  or: or,
	  message: message,
	  register: register
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports["default"] = function (condition) {
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
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports["default"] = function (message, args) {
	  var ind = 0;

	  return args ? message.replace(/%s/g, function () {
	    return args[ind++];
	  }) : message;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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

	var _messageFormatter = __webpack_require__(3);

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

/***/ }
/******/ ])
});
;