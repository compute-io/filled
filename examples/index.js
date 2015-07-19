'use strict';

var filled = require( './../lib' ),
	out;

// ---
// Plain arrays...

// 1x10:
out = filled( 10, Math.PI );
console.log( '1x10:' );
console.log( out );
console.log( '\n' );

// 2x1x3:
out = filled( [2,1,3], null );
console.log( '2x1x3:' );
console.log( out );
console.log( '\n' );

// 5x5x5:
out = filled( [5,5,5], 'beep' );
console.log( '5x5x5:' );
console.log( out );
console.log( '\n' );

// 10x5x10x20:
out = filled( [10,5,10,20], true );
console.log( '10x5x10x20:' );
console.log( JSON.stringify( out ) );
console.log( '\n' );


// ---
// Typed arrays...
out = filled( 10, -Math.PI, {
	'dtype': 'float32'
});
console.log( 'Typed arrays:' );
console.log( out );
console.log( '\n' );


// ---
// Matrices...
out = filled( [3,2], -1, {
	'dtype': 'int32'
});
console.log( 'Matrix: %s\n', out.toString() );
