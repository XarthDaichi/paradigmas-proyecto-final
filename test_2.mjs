import {map, filter, iterable, cut} from './combinadores.mjs';

const nats = iterable(0, (n) => n + 1);

const even = filter(nats, (n) => n % 2 === 0);

const evenGreaterThanTen = filter(even, (n) => n > 10);

const onlyFiveAfterTen = cut(evenGreaterThanTen, 5);

map(onlyFiveAfterTen, (n) => console.log(n));