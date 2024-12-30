import { useCallback, useState } from "react";
import { generateDeck, generateStacks } from "../common/utils";
import { TStack } from "../components/stacks/stack/stack";
import { useCanPlay } from "../hooks/useCanPlay";
import { Reset } from "../components/reset/reset";
import { Stacks } from "../components/stacks/stacks";
import { Hand } from "../components/hand/hand";
import { useFirebase } from "../hooks/useFirebase";
import { useJoin } from "../hooks/useJoin";
import { useCreate } from "../hooks/useCreate";

const HAND_SIZE = 6;

export const Main = () => {
	const [deck, setDeck] = useState<number[]>(generateDeck(98));
	const [dataToDrag, setDataToDrag] = useState<undefined | number>(undefined);
	const [hand, setHand] = useState<number[]>([]);
	const [playing, setPlaying] = useState(false);
	const [playedCards, setPlayedCards] = useState<number[]>([]);
	const [online, setOnline] = useState(true);
	const [stacks, setStacks] = useState<TStack[]>(generateStacks());
	const { canPlay } = useCanPlay(hand, stacks, deck);
	const { app } = useFirebase();
	const [name, setName] = useState("");
	const join = useJoin(app, "");
	const { createSession, isInviting } = useCreate(app, name);

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
		(currentCards: number) => {
			const cards = deck.slice(0, HAND_SIZE - currentCards);
			setHand([...hand, ...cards]);
			setDeck([...deck.filter((card) => !cards.includes(card))]);
			setPlaying(true);
		},
		[deck, hand]
	);

	const onNextButton = useCallback(() => {
		init(hand.length);
	}, [hand, init]);

	return (
		<>
			{!canPlay && (
				<Reset
					remaining={deck.length + hand.length}
					resetGame={resetGame}
				/>
			)}
			<h2 className="title">
				Cards Remaining: {deck.length + hand.length}
			</h2>
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
				<div>
					<input
						type="checkbox"
						id="online-checkbox"
						name="online-checkbox"
						checked={online}
						onChange={() => setOnline(!online)}
					/>
					<label htmlFor="online-checkbox">Online</label>
					{!online ? (
						<button onClick={() => init(0)}>START</button>
					) : (
						<div>
							{!isInviting && (
								<input
									type="text"
									value={name}
									onChange={(evt) =>
										setName(evt.target.value)
									}
								/>
							)}

							<button
								disabled={name === ""}
								onClick={() => createSession()}
							>
								CREATE GAME
							</button>
							<button>JOIN GAME</button>
						</div>
					)}
				</div>
			)}
		</>
	);
};
