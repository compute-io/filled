'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	validate = require( './validate.js' ),
	compile = require( './compile.js' );


// FUNCTIONS //

var array = require( './array.js' ),
	typedarray = require( './typedarray.js' ),
	arrayarray = require( './arrayarray.js' ),
	matrix = require( './matrix.js' );


// FILLED //

/**
* FUNCTION: filled( dims, value[, opts] )
*	Creates a filled matrix or array.
*
* @param {Number|Number[]} dims - dimensions
* @param {*} value - fill value
* @param {Object} [opts] - function options
* @param {String} [opts.dtype="generic"] - output data type
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} filled data structure
*/
function filled( dims, value, options ) {
	var opts = {},
		isArray,
		ndims,
		err,
		len,
		dt;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'filled()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	dt = opts.dtype || 'generic';
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		if ( dt === 'generic' ) {
			return array( len, value );
		}
		return typedarray( len, dt, value );
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			return matrix( dims, dt, value );
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
	}
	return arrayarray( dims, value );
} // end FUNCTION filled()


// EXPORTS //

module.exports = filled;
module.exports.compile = compile;
