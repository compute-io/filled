/* jshint evil:true */
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// CREATE FILLED //

/**
* FUNCTION: createFilled( dims, value )
*	Returns a function to create a filled multidimensional array.
*
* @param {Number[]} dims - dimensions
* @param {*} value - fill value
* @returns {Function} function to create a filled multidimensional array
*/
function createFilled( dims, value ) {
	var ndims = dims.length,
		len,
		fcn,
		n,
		i;

	if ( isString( value ) ) {
		value = '\'' + value + '\'';
	}
	// TODO: support additional non-numeric fill values...

	// Code generation. Create variables...
	n = ndims - 1;
	fcn = 'var ';
	for ( i = 0; i < ndims; i++ ) {
		fcn += 'i' + i + ',o' + i;
		if ( i < n ) {
			fcn += ',';
		} else {
			fcn += ';';
		}
	}
	// => var i0,o0,i1,o1,i2,o2,...,iN,oN;

	// Create the nested for loops...
	for ( i = 0; i < ndims; i++ ) {
		len = dims[ i ];

		// When initializing arrays, ensure fast elements...
		fcn += 'o' + i + '=';
		if ( len < 64000 ) {
			fcn += 'new Array(' + len + ')';
		} else {
			fcn += '[]';
		}
		fcn += ';';
		// => e.g., o1=new Array(10);

		fcn += 'for(i' + i + '=0;i' + i + '<' + len + ';i' + i + '++){';
		// => e.g., for(i0=0;i0<10;i++){
	}
	/* => e.g.,

		o0 = new Array( 1 );
		for ( i0 = 0; i0 < 1; i0++ ) {
			o1 = [];
			for ( i1 = 0; i1 < 64000; i1++ ) {
				o2 = new Array( 2 );
				for ( i2 = 0; i2 < 2; i2++ ) {
					...
	*/

	// Create the code which assigns the value...
	i = ndims - 1;
	fcn += 'o' + i;
	if ( len < 64000 ) {
		fcn += '[i' + i + ']=' + value + ';';
	} else {
		fcn += '.push(' + value + ');';
	}
	// => o2[i2]=value;  OR  o2.push(value);

	// Create the code which assigns nested arrays...
	for ( i = ndims-2; i >= 0; i-- ) {
		fcn += '}';
		fcn += 'o' + i;
		len = dims[ i ];
		n = i + 1;
		if ( len < 64000 ) {
			fcn += '[i' + i + ']=o' + n + ';';
			// => o1[i1]=o2;
		} else {
			fcn += '.push(o' + n + ');';
			// => o1.push(o2);
		}
	}
	// Tidy up:
	fcn += '}';
	/* => e.g.,
				...
					o2[ i2 ] = value;
				}
				o1.push( o2 );
			}
			o0[ i0 ] = o1;
		}
	*/

	// Return the array:
	fcn += 'return o0;';

	// Create a new function:
	return new Function( fcn );
	/* => e.g.,
		function filled() {
			var i0, o0, i1, o1, i2, o2;
			o0 = new Array( 1 );
			for ( i0 = 0; i0 < 1; i0++ ) {
				o1 = [];
				for ( i1 = 0; i1 < 64000; i1++ ) {
					o2 = new Array( 2 );
					for ( i2 = 0; i2 < 2; i2++ ) {
						o2[ i2 ] = value;
					}
					o1.push( o2 );
				}
				o0[ i0 ] = o1;
			}
			return o0;
		}
	*/
} // end FUNCTION createFilled()


// EXPORTS //

module.exports = createFilled;
