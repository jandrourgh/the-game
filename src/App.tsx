import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Card, TCard } from "./components/card";
import { Stacks } from "./components/stacks";
import { Deck } from "./components/deck";

function shuffle(array: Array<TCard>) {
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

const generateCardStack = (length: number) => {
	const cards = Array.from(Array(length)).map((value, index) => {
		return { number: Number(value || index + 2) };
	});
	shuffle(cards);
	return cards;
};

function App() {
	const [cardStack, setCardStack] = useState<TCard[]>(generateCardStack(98));
	const [dataToDrag, setDataToDrag] = useState<undefined | number>(undefined);

	const cardToReveal = useMemo(
		() => cardStack.length && cardStack[cardStack.length - 1].number,
		[cardStack]
	);

	const onCardAdded = () => {
		console.log("onCardAdded", cardStack.slice(0, -1));
		setCardStack([...cardStack.slice(0, -1)]);
	};

	return (
		<>
			<h2>Cards Remaining: {cardStack.length}</h2>
			<Stacks onCardAdded={onCardAdded} dataToDrag={dataToDrag} />
			<Deck
				onDragStart={() => setDataToDrag(cardToReveal)}
				cardToReveal={cardToReveal}
			/>
		</>
	);
}

export default App;
