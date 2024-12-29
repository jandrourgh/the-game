import { useCallback, useState } from "react";
import "./App.scss";
import { Stacks } from "./components/stacks/stacks";
import { Hand } from "./components/hand/hand";

const HAND_SIZE = 6;

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

const generateCardStack = (length: number) => {
	const cards = Array.from(Array(length)).map((value, index) => {
		return value || index + 2;
	});
	shuffle(cards);
	return cards;
};

function App() {
	const [cardStack, setCardStack] = useState<number[]>(generateCardStack(98));
	const [dataToDrag, setDataToDrag] = useState<undefined | number>(undefined);
	const [hand, setHand] = useState<number[]>([]);
	const [playing, setPlaying] = useState(false);

	const onCardAdded = (card: number) => {
		setHand([...hand.filter((filtered) => filtered !== card)]);
	};

	const playCard = (card: number) => {
		setDataToDrag(card);
	};

	const init = useCallback(
		(diff: number) => {
			const cards = cardStack.slice(0, HAND_SIZE - diff);
			setHand([...hand, ...cards]);
			setCardStack([
				...cardStack.filter((card) => !cards.includes(card)),
			]);
			setPlaying(true);
		},
		[cardStack, hand]
	);

	const onNextButton = useCallback(() => {
		init(hand.length);
	}, [hand, init]);

	return (
		<>
			<h2 className="title">Cards Remaining: {cardStack.length}</h2>
			<Stacks onCardAdded={onCardAdded} dataToDrag={dataToDrag} />
			<hr />
			{playing ? (
				<>
					<Hand playCard={(card) => playCard(card)} cards={hand} />

					{/* to do: disabled dinámico con cartas jugadas */}
					<button disabled={hand.length > 4} onClick={onNextButton}>
						{hand.length > 4
							? `Play ${hand.length - 4} more`
							: "Next"}
					</button>
				</>
			) : (
				<button onClick={() => init(0)}>START</button>
			)}
		</>
	);
}

export default App;
