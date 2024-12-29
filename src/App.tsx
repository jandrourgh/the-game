import { useCallback, useState } from "react";
import "./App.scss";
import { Stacks } from "./components/stacks/stacks";
import { Hand } from "./components/hand/hand";
import { Reset } from "./components/reset/reset";
import { TStack } from "./components/stacks/stack/stack";
import { generateCardStack } from "./common/utils";
import { useCanPlay } from "./hooks/useCanPlay";

const HAND_SIZE = 6;

function App() {
	const [cardStack, setCardStack] = useState<number[]>(generateCardStack(98));
	const [dataToDrag, setDataToDrag] = useState<undefined | number>(undefined);
	const [hand, setHand] = useState<number[]>([]);
	const [playing, setPlaying] = useState(false);
	const [playedCards, setPlayedCards] = useState<number[]>([]);
	const [stacks, setStacks] = useState<TStack[]>([
		{ lastCardPlayed: undefined, direction: "down", id: "1" },
		{ lastCardPlayed: undefined, direction: "down", id: "2" },
		{ lastCardPlayed: undefined, direction: "up", id: "3" },
		{ lastCardPlayed: undefined, direction: "up", id: "4" },
	]);
	const { canPlay } = useCanPlay(hand, stacks);
	const resetGame = () => {
		//to-do hacer esto un poco más elegante
		window.location.reload();
	};

	const onCardAdded = (card: number, id: string) => {
		setPlayedCards([...playedCards, card]);
		setStacks(
			stacks.map((stack) =>
				stack.id === id ? { ...stack, lastCardPlayed: card } : stack
			)
		);
		setDataToDrag(undefined);
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

	// to-do llevar la cuenta de las cartas jugadas para saber si puedes jugar algo de la mano
	// const canPlay = useMemo(() => {}, [playing, hand]);

	return (
		<>
			{!canPlay && (
				<Reset remaining={cardStack.length} resetGame={resetGame} />
			)}
			<h2 className="title">Cards Remaining: {cardStack.length}</h2>
			<Stacks
				onCardAdded={(number, id) => onCardAdded(number, id)}
				dataToDrag={dataToDrag}
				stacks={stacks}
			/>
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
