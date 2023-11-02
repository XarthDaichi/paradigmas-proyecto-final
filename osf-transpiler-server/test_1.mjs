import {Stream, iterable} from './combinadores.mjs';

const nats = new Stream( iterable(0, (n) => n + 1, 1000) );

const even = nats.filter((n) => n % 2 === 0);

const evenLessThanEleven = even.filter((n) => n < 11);

evenLessThanEleven.map((n) => console.log(n)).cut(10).toList().forEach(e => {})
