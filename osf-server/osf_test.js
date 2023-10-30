class Nats {
	constructor(init=0, max=Infinity) {
		this.init = init;
	}
	[Symbol.iterator]() {
		let n = this.init;
		return {
			next: () => {return {value:n++, done: n === max}}
		}
	}
}

const nats = Nats();