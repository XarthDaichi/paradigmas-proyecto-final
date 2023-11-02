import {Stream, iterable} from './combinadores.mjs';

const nats = new Stream( iterable(0, (n) => n + 1) );

const even = nats.filter((n) => n % 2 === 0);

const evenGreaterThanTen = even.filter((n) => n > 10);

const onlyFiveAfterTen = evenGreaterThanTen.cut(5);

for (const e of onlyFiveAfterTen.map((n) => console.log(n)).toList()) {

}