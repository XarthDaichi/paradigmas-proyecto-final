import {Stream, iterable} from './combinadores.mjs';

const nats = new Stream( iterable(0, (n) => n + 1) );

/*
    const nats = function* = (0, (n) => n + 1) => {
        let n = 0;
        while(n < end) {
            yield n;
            n = n + 1;
        }
    }
*/

const even = nats.filter((n) => n % 2 === 0);

/*
    const even = function* = ((n) => n % 2 === 0) => {
        for (const e of nats) {
            if (e % 2 === 0) {
                yield e;
            }
        }
    }
*/

const evenLessThanEleven = even.filter((n) => n < 11);

/*
    const evenLessThanEleven = function* = ((n) = n < 11) => {
        for (const e of even) {
            if (e < 11) {
                yield e;
            }
        }
    }
*/

evenLessThanEleven.map((n) => console.log(n)).cut(10).toList().forEach(e => {})

/*
const nats = new Stream(iterable());
const even = nats.filter(n => n % 2 === 0);
const evenLessThanEleven = even.filter(n => n < 11);
const evenLessThanElevenOnlyTen = evenLessThanEleven.cut(10);
evenLessThanElevenOnlyTen.toList().forEach(n => console.log(n));
*/