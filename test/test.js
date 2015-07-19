/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	filled = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-filled', function tests() {

	it( 'should export a function', function test() {
		expect( filled ).to.be.a( 'function' );
	});

	it( 'should export a function to compile a filled function', function test() {
		expect( filled.compile ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer or an array of positive integers', function test() {
		var values = [
			'5',
			0,
			Math.PI,
			-1,
			NaN,
			true,
			null,
			undefined,
			{},
			[1,0],
			[1,null],
			[1,Math.PI],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				filled( value, 5 );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				filled( [1,2,3], 5, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				filled( [10], 5, {
					'dtype': value
				});
			};
		}
	});

	it( 'should return a filled matrix', function test() {
		var actual, expected;

		actual = filled( [2,2], -5, {
			'dtype': 'int32'
		});

		expected = new Int32Array( 4 );
		for ( var i = 0; i < expected.length; i++ ) {
			expected[ i ] = -5;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'int32' );
		assert.deepEqual( actual.data, expected );
	});

	it( 'should return a filled typed-array', function test() {
		var expected,
			actual,
			pi;

		pi = Math.PI;

		actual = filled( 5, pi, {
			'dtype': 'float32'
		});
		expected = new Float32Array( [pi,pi,pi,pi,pi] );

		assert.deepEqual( actual, expected );

		actual = filled( [10], 2, {
			'dtype': 'uint8_clamped'
		});
		expected = new Uint8ClampedArray( [2,2,2,2,2,2,2,2,2,2] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return a filled generic array', function test() {
		var actual, expected;

		actual = filled( 5, -2 );
		expected = [ -2, -2, -2, -2, -2 ];

		assert.deepEqual( actual, expected );

		actual = filled( [1], 8/9 );
		expected = [ 8/9 ];

		assert.deepEqual( actual, expected );

		actual = filled( [2,1], null );
		expected = [ [null], [null] ];

		assert.deepEqual( actual, expected );

		actual = filled( [2,1,3], 'a' );
		expected = [ [['a','a','a']], [['a','a','a']] ];

		assert.deepEqual( actual, expected );
	});

	it( 'should support fast elements', function test() {
		var actual, i;

		this.timeout( 0 );

		actual = filled( [100000], 10 );
		for ( i = 0; i < actual.length; i++ ) {
			assert.strictEqual( actual[ i ], 10 );
		}

		actual = filled( [100000,2], -10 );
		for ( i = 0; i < actual.length; i++ ) {
			assert.deepEqual( actual[ i ], [-10,-10] );
		}
	});

	it( 'should, until ndarrays are supported, ignore the `dtype` option and return a generic multidimensional array for >2 dimensions', function test() {
		var actual, expected;

		actual = filled( [2,1,3], -1, {
			'dtype': 'float32'
		});
		expected = [ [[-1,-1,-1]], [[-1,-1,-1]] ];

		assert.deepEqual( actual, expected );
	});

});
