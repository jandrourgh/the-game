import { TStack } from "../components/stacks/stack/stack";

function shuffle(array: Array<number>) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
}

export const generateCardStack = (length: number) => {
	const cards = Array.from(Array(length)).map((value, index) => {
		return value || index + 2;
	});
	for (let i = 0; i < 4; i++) {
		shuffle(cards);
	}
	return cards;
};

export const checkCardStack = (card: number | undefined, stack: TStack) => {
	if (!card) return false;
	if (
		stack.lastCardPlayed === card + 10 ||
		stack.lastCardPlayed === card - 10
	)
		return true;
	if (stack.lastCardPlayed === undefined) return true;
	if (stack.direction === "down") {
		return card < stack.lastCardPlayed;
	} else {
		return card > stack.lastCardPlayed;
	}
};
