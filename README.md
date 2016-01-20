Filled
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a filled [matrix](https://github.com/dstructs/matrix) or array.


## Installation

``` bash
$ npm install compute-filled
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var filled = require( 'compute-filled' );
```

#### filled( dims, value[, opts] )

Creates a filled [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions.

``` javascript
var out;

out = filled( 5, -2 );
// returns [ -2, -2, -2, -2, -2 ];

out = filled( [2,1,2], 'a' );
// returns [ [ ['a','a'] ], [ ['a','a'] ] ]
```

The function accepts the following `options`:

*	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `generic`.

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var out;

out = filled( 5, 1.5, {
	'dtype': 'float32'
});
// returns Float32Array( [1.5,1.5,1.5,1.5,1.5] );

out = filled( [3,2], -1, {
	'dtype': 'int32'
});
/*
	[ -1 -1
	  -1 -1
	  -1 -1 ]
*/
```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	``` javascript
	var out = filled( [2,1,3], null, {
		'dtype': 'float32'
	});
	// returns [ [ [null,null,null] ], [ [null,null,null] ] ]
	```
*	The fill `value` is __not__ validated or checked for `dtype` compatibility.

	``` javascript
	var out;

	out = filled( 2, 'beep', {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0] )

	out = filled( 3, true, {
		'dtype': 'float32'
	});
	// returns Float32Array( [1,1,1] )
	```


#### filled.compile( dims, value )

Compiles a `function` for creating filled [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) having specified dimensions.

``` javascript
var fcn, out;

fcn = filled.compile( [2,1,3], -1 );

out = fcn();
// returns [ [ [-1,-1,-1] ], [ [-1,-1,-1] ] ]

out = fcn();
// returns [ [ [-1,-1,-1] ], [ [-1,-1,-1] ] ]
```

__Notes__:
*	When repeatedly creating [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) having the same shape, creating a customized `filled` function will provide performance benefits.
*	Non-numeric fill `values` are supported. `array` and `object` fill values are essentially deep copied and replicated and do __not__ refer to the same memory address.

	``` javascript
	var fcn, out;

	// Strings:
	fcn = filled.compile( 2, 'beep' );

	out = fcn();
	// returns [ 'beep', 'beep' ]

	// +-Infinity:
	fcn = filled.compile( 2, Number.NEGATIVE_INFINITY );

	out = fcn();
	// returns [ -inf, -inf ]

	// Objects:
	fcn = filled.compile( 2, {} );

	out = fcn();
	// returns [ {}, {} ]

	out[ 0 ] === out[ 1 ];
	// returns false

	// Arrays:
	fcn = filled.compiled( 2, [1,2,3] );

	out = fcn();
	// returns [ [1,2,3], [1,2,3] ]

	// Dates:
	fcn = filled.compile( 2, new Date() );

	out = fcn();
	// returns [ <Date>, <Date> ]
	```



## Examples

``` javascript
var filled = require( 'compute-filled' ),
	out;

// Plain arrays...

// 1x10:
out = filled( 10, Math.PI );

// 2x1x3:
out = filled( [2,1,3], null );

// 5x5x5:
out = filled( [5,5,5], 'beep' );

// 10x5x10x20:
out = filled( [10,5,10,20], true );

// Typed arrays...
out = filled( 10, -Math.PI, {
	'dtype': 'float32'
});

// Matrices...
out = filled( [3,2], -1, {
	'dtype': 'int32'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-filled.svg
[npm-url]: https://npmjs.org/package/compute-filled

[travis-image]: http://img.shields.io/travis/compute-io/filled/master.svg
[travis-url]: https://travis-ci.org/compute-io/filled

[coverage-image]: https://img.shields.io/codecov/c/github/compute-io/filled/master.svg
[coverage-url]: https://codecov.io/github/compute-io/filled?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/filled.svg
[dependencies-url]: https://david-dm.org/compute-io/filled

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/filled.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/filled

[github-issues-image]: http://img.shields.io/github/issues/compute-io/filled.svg
[github-issues-url]: https://github.com/compute-io/filled/issues
