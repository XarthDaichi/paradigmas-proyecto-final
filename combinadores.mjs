export function map (iter, func) {
	let it = iter.next();
	while (!iter.done) {
		func(it.value);
		it = iter.next();
	}
}

export function* filter (iter, pred) {
	let it = iter.next();
	while (!iter.done) {
		if (pred(it.value)) {
			yield it.value;
		}
		it = iter.next();
	}
}

export function* iterable (start, func) {
	let yielder = start;
	while (true) {
		yield yielder;
		yielder = func(yielder);
	}
}

export function* cut (iter, amount) {
	let i = 0;
	while (i < amount) {
		yield iter.next().value;
		i++;
	}
}
