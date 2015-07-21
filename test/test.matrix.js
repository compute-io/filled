/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	filled = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'filled matrix', function tests() {

	it( 'should export a function', function test() {
		expect( filled ).to.be.a( 'function' );
	});

	it( 'should return a filled matrix', function test() {
		var actual, expected;

		actual = filled( [2,2], 'float32', -Math.PI );

		expected = new Float32Array( 4 );
		for ( var i = 0; i < expected.length; i++ ) {
			expected[ i ] = -Math.PI;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float32' );
		assert.deepEqual( actual.data, expected );
	});

});
