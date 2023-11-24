export class Stream {
	#iterable; // esto es para hacer que iterable sea private
	constructor( iterable ) {
		this.#iterable = iterable;
	}

	static iterableCreator(start = 0, func, end=Infinity) {
		function* gen() {
			let n = start;
			while (n < end) {
				yield n;
				n = func(n);
			}
		}
		return new Stream ( gen() );
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
			let i = n;
			for (const e of iterable) {
				// console.log('cut:', iterable.caller, e);
				i--;
				if (i < 0) break;
				yield e;
			}
		}
		return new Stream( gen(this.#iterable) );
	}

	forEach( f ) {
		for (const e of this.#iterable) {
			f(e)
		}
	}

	iterable() {
		return this.#iterable;
	}
}