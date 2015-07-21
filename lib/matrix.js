'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );


// FILLED //

/**
* FUNCTION: filled( dims, dt, value )
*	Creates a filled matrix.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} value - fill value
* @returns {Matrix} filled matrix
*/
function filled( dims, dt, v ) {
	var out,
		i;

	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = v;
	}
	return out;
} // end FUNCTION filled()


// EXPORTS //

module.exports = filled;
