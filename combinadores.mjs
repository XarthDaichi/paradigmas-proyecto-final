export function* Nats(start = 0, end=Infinity) {
    let n = start;
    while(n < end) {
        yield n++;
    }
}

export class Stream {
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
			for (const e of iterable) {
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
				if (i < n) {
					yield e;
					i++;
				}
				else break;
			}
		}
		return new Stream( gen(this.#iterable) );
	}
}

// export function map (iter, func) {
// 	let it = iter.next();
// 	while (!iter.done) {
// 		func(it.value);
// 		it = iter.next();
// 	}
// }

// export function* filter (iter, pred) {
// 	let it = iter.next();
// 	while (!iter.done) {
// 		if (pred(it.value)) {
// 			yield it.value;
// 		}
// 		it = iter.next();
// 	}
// }

// export function* iterable (start, func) {
// 	let yielder = start;
// 	while (true) {
// 		yield yielder;
// 		yielder = func(yielder);
// 	}
// }

// export function* cut (iter, amount) {
// 	let i = 0;
// 	while (i < amount) {
// 		yield iter.next().value;
// 		i++;
// 	}
// }
