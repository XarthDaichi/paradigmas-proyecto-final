// *** Generated by OFS compiler version 2.0 *** 
import {Stream} from './combinadores.mjs';


Stream.iterableCreator(1,  (n) => n + 2).cut(10).map((it) => console.log( it )).forEach((e) => e);

