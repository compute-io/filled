/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	filled = require( './../lib/arrayarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'filled multidimensional array', function tests() {

	it( 'should export a function', function test() {
		expect( filled ).to.be.a( 'function' );
	});

	it( 'should return a filled array of arrays', function test() {
		var actual, expected;

		actual = filled( [2,1], 2 );
		expected = [ [2], [2] ];

		assert.deepEqual( actual, expected );

		actual = filled( [2,1,3], 'a' );
		expected = [ [['a','a','a']], [['a','a','a']] ];

		assert.deepEqual( actual, expected );
	});

});
