export function* iterable(start = 0, func, end=Infinity) {
    let n = start;
    while(n < end) {
        yield n;
		n = func(n);
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
				// console.log('map', iterable.caller, '|', e);
				yield f( e );
			}
		}
		return new Stream( gen(this.#iterable) );
	}

	filter( p ) {
		function* gen(iterable) {
			for (const e of iterable) {
				// console.log('filter', iterable.caller, e);
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
				// console.log('cut:', iterable.caller, e);
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