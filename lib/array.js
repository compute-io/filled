'use strict';

/**
* FUNCTION: filled( len, value )
*	Creates a filled array.
*
* @param {Number} len - array length
* @param {*} value - fill value
* @returns {Array} filled array
*/
function filled( len, v ) {
	var out,
		i;

	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = v;
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( v );
		}
	}
	return out;
} // end FUNCTION filled()


// EXPORTS //

module.exports = filled;
