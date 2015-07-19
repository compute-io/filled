/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createFcn = require( './../lib/filled.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'create filled function', function tests() {

	it( 'should export a function', function test() {
		expect( createFcn ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		assert.isFunction( createFcn( [1,2,3], 5 ) );
	});

	it( 'should correctly create a filled function for a linear array', function test() {
		var expected, actual, filled, i;

		this.timeout( 0 );

		// Small array:
		filled = createFcn( [10], -5 );

		expected = new Array( 10 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = -5;
		}
		actual = filled();

		assert.deepEqual( actual, expected );

		// Large array:
		filled = createFcn( [100000], Math.PI );

		expected = [];
		for ( i = 0; i < 100000; i++ ) {
			expected.push( Math.PI );
		}
		actual = filled();

		for ( i = 0; i < expected.length; i++ ) {
			assert.strictEqual( actual[i], expected[i], i );
		}
	});

	it( 'should correctly create a filled function for a multidimensional array', function test() {
		var expected,
			actual,
			filled,
			dims,
			arr1,
			arr2,
			i, j, k;

		this.timeout( 0 );

		// [1]
		dims = [ 1, 64000, 2 ];
		filled = createFcn( dims, -Math.PI );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = -Math.PI;
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = filled();

		expected = expected[ 0 ];
		actual = actual[ 0 ];
		for ( i = 0; i < dims[ 1 ]; i++ ) {
			assert.deepEqual( actual[i], expected[i], i );
		}

		// [2]
		dims = [ 64000, 1, 2 ];
		filled = createFcn( dims, null );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = null;
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = filled();

		for ( i = 0; i < dims[ 0 ]; i++ ) {
			assert.deepEqual( actual[i], expected[i], i );
		}

		// [3]
		dims = [ 1, 2, 64000 ];
		filled = createFcn( dims, 'beep' );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = 'beep';
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = filled();

		expected = expected[ 0 ];
		actual = actual[ 0 ];
		for ( i = 0; i < dims[ 1 ]; i++ ) {
			for ( j = 0; j < dims[ 2 ]; j++ ) {
				assert.strictEqual( actual[i][j], expected[i][j], i + ',' + j );
			}
		}
	});

});
