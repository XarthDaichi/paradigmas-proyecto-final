import {map, filter, iterable} from './combinadores.mjs';

const nats = iterable(0, (n) => n + 1);

const even = filter(nats, (n) => n % 2 === 0);

const evenLessThanEleven = filter(even, (n) => n < 11);

map(evenLessThanEleven, (n) => console.log(n));