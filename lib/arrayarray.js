'use strict';

// MODULES //

var recurse = require( './recurse.js' );


// FILLED //

/**
* FUNCTION: filled( dims, value )
*	Creates a filled multidimensional array.
*
* @param {Number[]} dims - dimensions
* @param {*} value - fill value
* @returns {Array} filled multidimensional array
*/
function filled( dims, v ) {
	return recurse( dims, 0, v );
} // end FUNCTION filled()


// EXPORTS //

module.exports = filled;
