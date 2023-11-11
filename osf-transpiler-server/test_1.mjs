import {Stream} from './combinadores.mjs';

const nats = new Stream( Stream.iterableCreator(0, (n) => n + 1));

const even = nats.filter((n) => n % 2 === 0);

const evenLessThanEleven = even.filter((n) => n < 11);

for (const e of evenLessThanEleven.map((n) => console.log(n)).cut(10).iterable()) {

}
