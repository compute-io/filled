/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	filled = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'filled array', function tests() {

	it( 'should export a function', function test() {
		expect( filled ).to.be.a( 'function' );
	});

	it( 'should return a filled array', function test() {
		var actual, expected;

		actual = filled( 5, 2 );
		expected = [ 2, 2, 2, 2, 2 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should support fast elements', function test() {
		var actual, i;

		this.timeout( 0 );

		actual = filled( 100000, -5 );
		for ( i = 0; i < actual.length; i++ ) {
			assert.strictEqual( actual[ i ], -5 );
		}
	});

});
