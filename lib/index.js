'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	recurse = require( './recurse.js' ),
	compile = require( './compile.js' );


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
	/* jshint newcap:false */
	var opts = {},
		isArray,
		ndims,
		ctor,
		out,
		err,
		len,
		dt,
		i;

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
		// Ensure fast elements for generic arrays...
		if ( dt === 'generic' && len < 64000 ) {
			out = [];
			for ( i = 0; i < len; i++ ) {
				out.push( value );
			}
		} else {
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'filled()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( len );
			for ( i = 0; i < len; i++ ) {
				out[ i ] = value;
			}
		}
		return out;
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			out = matrix( dims, dt );
			for ( i = 0; i < out.length; i++ ) {
				out.data[ i ] = value;
			}
			return out;
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
		// out = ndarray();
		// for ( i = 0; i < out.length; i++ ) {
		//	out.data[ i ] = value;
		// }
	}
	return recurse( dims, 0, value );
} // end FUNCTION filled()


// EXPORTS //

module.exports = filled;
module.exports.compile = compile;
