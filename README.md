![NPM](https://nodei.co/npm/functional-validators.png?downloads=true&downloadRank=true&stars=true)

# About

Functional Validators.

**First**: Build validation expressions.

**Second**: Validate your data by this expression.

## Installation
```
npm install functional-validators
```
### Importing

**nodejs**
```javascript
var V = require('functional-validators')
```

**browser**
```html
<script src="v.min.js"></script>
```


# Validators List

* V.email
* V.url
* V.range
* V.text
* V.capitalLetter
* V.number
* V.word
* V.required
* V.phone
* V.date

### Functions

* V.and
* V.or
* V.message


# Usage

1) Simple Validator
```javascript

	var emailValidator = V.email();

	emailValidator('email@domain.com');
	//output: true
	emailValidator('emaildomaincom');
	//output: 'invalid email'

```
2) Simple Validator with the custom message
```javascript

	var emailValidator = V.message(V.email(), 'something wrong');

	emailValidator('email@domain.com');
	//output: true
	emailValidator('email@domaincom');
	//output: 'something wrong'

```

3) AND Group validators
```javascript

	var emailValidator = V.email(),
			rangeValidator = V.range(1, 17),
			groupANDValidator = V.and(emailValidator, rangeValidator);

	groupANDValidator('email@domain.com');
	//output: true
 	groupANDValidator('email@domainand.com');
	//output: ["string length should be between 1 and 17 chars"]

  groupANDValidator('emaildomainand.com');
  //output: ["invalid email", "string length should be between 1 and 17 chars"]

```

4) OR Group validators
```javascript

	var emailValidator = V.email(),
    	rangeValidator = V.range(1, 10),
    	groupORValidator = V.or(emailValidator, rangeValidator);

	groupORValidator('email@domain.com');
    //output: true

    groupORValidator('0123456789');
    //output: true

    groupORValidator('emaildomainand.com');
    //output: ["invalid email", "string length should be between 1 and 10 chars"]

```

5) Complex group validator
```javascript

	var emailValidator = V.email(),
    	rangeValidator = V.range(5, 10),
        textValidator = V.text(),
    	groupANDValidator = V.and(textValidator, rangeValidator),
        groupORValidator = V.or(groupANDValidator, emailValidator);

	groupORValidator('email@domain.com');
    //output: true

    groupORValidator('0123456789');
    //output: true

    groupORValidator('text');
    //output: true

	groupORValidator('123');
    //output: ["should be a text only", "string length should be between 5 and 10 chars", "invalid email"]

```

6) Group validators with custom messages
```javascript

	var emailValidator = V.email(),
    	rangeValidator = V.range(1, 10),
    	groupORValidator = V.message(V.or(emailValidator, rangeValidator), 'something is wrong here!');

	groupORValidator('email@domain.com');
    //output: true

    groupORValidator('0123456789');
    //output: true

    groupORValidator('emaildomainand.com');
    //output: "something is wrong here!"

```

7) Group validators with custom messages for special validator
```javascript

	var emailValidator = V.email(),
    	rangeValidator = V.range(1, 10),
    	groupORValidator = V.or(emailValidator, V.message(rangeValidator, 'something is wrong here!'));

	groupORValidator('email@domain.com');
    //output: true

    groupORValidator('0123456789');
    //output: true

    groupORValidator('emaildomainand.com');
    //output: ["invalid email", "something is wrong here!"]

```

# How to add Validators


```javascript

    /**
     * @params validatorName {string}
     * @params validationExpression {function}
     * @params force {boolean} - force rewrite, in case if validator with current name already exists
     */

    V.register = function(validatorName, validationExpression, force){
        ...
    }

```

### Example

```javascript

    V.register('yourValidatorName', function(val, args..., message){
        return !!validationExpression || massage || 'default error message';
    }, false);


    var validator = V.yourValidatorName(args...);

    validator(string);

```
