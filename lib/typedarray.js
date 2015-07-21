'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' );


// FILLED //

/**
* FUNCTION: filled( len, dt, value )
*	Creates a filled typed array.
*
* @param {Number} len - array length
* @param {String} dt - data type
* @param {Number} value - fill value
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} filled typed array
*/
function filled( len, dt, v ) {
	/* jshint newcap:false */
	var ctor,
		out,
		i;

	ctor = ctors( dt );
	if ( ctor === null ) {
		throw new Error( 'filled()::invalid value. Data type does not have a corresponding array constructor. Value: `' + dt + '`.' );
	}
	out = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		out[ i ] = v;
	}
	return out;
} // end FUNCTION filled()


// EXPORTS //

module.exports = filled;
