/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	compile = require( './../lib/compile.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compile', function tests() {

	it( 'should export a function', function test() {
		expect( compile ).to.be.a( 'function' );
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
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				compile( value, 5 );
			};
		}
	});

	it( 'should return a function', function test() {
		assert.isFunction( compile( 5, Math.PI ) );
		assert.isFunction( compile( [1,2,3], Math.PI ) );
	});

});
