// *** Generated by OFS compiler version 2.0 *** 
import {Stream} from './combinadores.mjs';
import process from 'node:process';


process.stdout.write( '*** Test Case 0 ***\n' );

const FOUR = 4;

let ten = 2 * FOUR + 1;

const printIt = (it) => console.log( it );

printIt( 'ten= ' + ten );

const some_list = [ 1, [ 2, 3, [ 4 ] ], 'hola' ];

printIt( some_list );

printIt( some_list[ 1 ][ 0 + 1 ] );

printIt( some_list.length );

printIt( some_list.at( -1 ) == 'hola' );

printIt( ten / 2 == 5 || ten / 2 != 5 );

