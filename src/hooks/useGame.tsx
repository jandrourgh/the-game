import { useCallback, useEffect, useState } from "react";
import { generateDeck, generateStacks } from "../common/utils";
import { useCanPlay } from "./useCanPlay";
import { TStack } from "../components/stacks/stack/stack";
import { FirebaseApp } from "firebase/app";
import { useOnline } from "./useOnline";

const HAND_SIZE = 6;

export const useGame = (app: FirebaseApp) => {
	const [deck, setDeck] = useState<number[]>(generateDeck(98));
	const [dataToDrag, setDataToDrag] = useState<undefined | number>(undefined);
	const [hand, setHand] = useState<number[]>([]);
	const [playing, setPlaying] = useState(false);
	const [playedCards, setPlayedCards] = useState<number[]>([]);
	const [stacks, setStacks] = useState<TStack[]>(generateStacks());
	const { canPlay } = useCanPlay(hand, stacks, deck);
	const { connect, nextTurn, updateDeck, updateStacks, sessionData } =
		useOnline(app);

	const init = useCallback(
		(currentCards: number) => {
			const cards = deck.slice(0, HAND_SIZE - currentCards);
			setHand([...hand, ...cards]);
			const newDeck = [...deck.filter((card) => !cards.includes(card))];
			setDeck(newDeck);
			updateDeck(newDeck);
		},
		[deck, hand, updateDeck]
	);

	const startGame = () => {
		init(0);
		setPlaying(true);
	};
	useEffect(() => {
		console.log({ sessionData });
		if (!sessionData) return;
		setDeck(sessionData.deck);
		setStacks(sessionData.stacks);
	}, [sessionData]);

	const resetGame = () => {
		//to-do hacer esto un poco más elegante tipo generar un estado inicial
		// razon #1 para usar zustand
		window.location.reload();
	};

	const onCardAdded = (card: number, id: string) => {
		setPlayedCards([...playedCards, card]);
		const newStacks = stacks.map((stack) =>
			stack.id === id
				? {
						...stack,
						lastCardPlayed: card,
						cards: [...stack.cards, card],
				  }
				: stack
		);
		setStacks(newStacks);
		updateStacks(newStacks);
		setDataToDrag(undefined);
		setHand([...hand.filter((filtered) => filtered !== card)]);
	};

	const playCard = (card: number) => {
		setDataToDrag(card);
	};

	const onNextButton = useCallback(() => {
		init(hand.length);
		nextTurn("pip");
	}, [hand, init, nextTurn]);

	return {
		resetGame,
		onCardAdded,
		playCard,
		onNextButton,
		init,
		startGame,
		connect,
		dataToDrag,
		playing,
		canPlay,
		deck,
		hand,
		stacks,
	};
};
