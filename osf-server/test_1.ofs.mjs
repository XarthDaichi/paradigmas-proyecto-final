function* iterable(start = 0, func, end=Infinity) {
let n = start;
while(n < end) {
yield n;
n = func(n);
}
}
class Stream {
#iterable; // esto es para hacer que iterable sea private
constructor( iterable ) {
this.#iterable = iterable;
}
map( f ) {
function* gen(iterable) {
for (const e of iterable) {
yield f( e );
}
}
return new Stream( gen(this.#iterable) );
}

filter( p ) {
function* gen(iterable) {
for (const e of iterable)
{
if( p( e ) ) yield e;
}
}
return new Stream( gen(this.#iterable) );
}

toList() { // Caution: can only be used with finite iterators
return [...this.#iterable];
}
cut( n ) {
function* gen(iterable) {
let i = 0;
for (const e of iterable) {
//console.log('cut:', e);
if (i < n) {
yield e;
}
else break;
i++;
}
}
return new Stream( gen(this.#iterable) );
}
}

const nats = new Stream( iterable(0, (n) => n + 1, 1000) );

const even = nats.filter((n) => n % 2 === 0);

const evenLessThanEleven = even.filter((n) => n < 11);

evenLessThanEleven.map((n) => console.log(n)).cut(10).toList().forEach(e => {}) // Esto de aca se cambio 666