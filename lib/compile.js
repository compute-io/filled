'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	filled = require( './filled.js' );


// COMPILE //

/**
* FUNCTION: compile( dims, value )
*	Compiles a function for creating filled arrays.
*
* @param {Number|Number[]} dims - dimensions
* @param {*} value - fill value
* @returns {Function} function for creating filled arrays
*/
function compile( dims, value ) {
	var isArray;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'compile()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( !isArray ) {
		dims = [ dims ];
	}
	return filled( dims, value );
} // end FUNCTION compile()


// EXPORTS //

module.exports = compile;
