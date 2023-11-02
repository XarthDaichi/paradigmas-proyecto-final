import {Stream, Nats} from './combinadores.mjs';

const nats = new Stream( Nats(0) );

const even = nats.filter((n) => n % 2 === 0);

const evenLessThanEleven = even.filter((n) => n < 11);

for (const e of evenLessThanEleven.map((n) => console.log(n)).cut(10).toList()) {
    // console.log(e);
}