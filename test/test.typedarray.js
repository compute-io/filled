/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	filled = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'filled typed array', function tests() {

	it( 'should export a function', function test() {
		expect( filled ).to.be.a( 'function' );
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
				filled( 10, value, -1 );
			};
		}
	});

	it( 'should return a filled typed array', function test() {
		var actual, expected;

		actual = filled( 5, 'int8', -1 );
		expected = new Int8Array( [-1,-1,-1,-1,-1] );

		assert.deepEqual( actual, expected );
	});

});
