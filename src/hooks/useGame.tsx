import { useCallback, useEffect, useMemo, useState } from "react";
import { generateDeck, generateStacks } from "../common/utils";
import { useCanPlay } from "./useCanPlay";
import { TStack } from "../components/stacks/stack/stack";
import { FirebaseApp } from "firebase/app";
import { useOnline } from "./useOnline";

const HAND_SIZE = 6;

export const useGame = (app: FirebaseApp) => {
	const [deck, setDeck] = useState<number[]>([]);
	const [dataToDrag, setDataToDrag] = useState<undefined | number>(undefined);
	const [hand, setHand] = useState<number[]>([]);
	const [playing, setPlaying] = useState(false);
	const [playedCards, setPlayedCards] = useState<number[]>([]);
	const [stacks, setStacks] = useState<TStack[]>([]);
	const { canPlay } = useCanPlay(hand, stacks, deck);
	const {
		connect,
		updateDeck,
		updateStacks,
		setCurrentTurn,
		sessionData,
		myUser,
	} = useOnline(app);

	const players = useMemo(() => {
		if (!sessionData || !myUser) {
			console.log("no hay una mierda", sessionData, myUser);
			return [];
		}
		return sessionData.players.map((player) => ({
			...player,
			itsMe: player.uid === myUser.uid,
		}));
	}, [sessionData, myUser]);

	const drawCards = useCallback(
		(currentCards: number) => {
			const cards = deck.slice(0, HAND_SIZE - currentCards);
			const newHand = [...hand, ...cards];
			setHand(newHand);
			const newDeck = [...deck.filter((card) => !newHand.includes(card))];
			setDeck(newDeck);
			updateDeck(newDeck);
		},
		[deck, hand, updateDeck]
	);

	const startGame = () => {
		setDeck(generateDeck(98));
		setStacks(generateStacks());
	};

	useEffect(() => {
		if (deck.length && stacks.length && !playing && !hand.length) {
			drawCards(0);
			setPlaying(true);
		}
	}, [deck, stacks, playing, hand, drawCards]);

	useEffect(() => {
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
		if (sessionData?.firstMove == false) {
			if (!myUser) return;
			setCurrentTurn(myUser);
		}
	};

	const playCard = (card: number) => {
		setDataToDrag(card);
	};

	const onNextButton = useCallback(() => {
		drawCards(hand.length);
		if (!sessionData) return;
		let userIndex = sessionData.players.findIndex((user) => user.turn);
		if (userIndex == -1 || userIndex === undefined) {
			return;
		}
		if (userIndex === sessionData.players.length - 1) {
			userIndex = 0;
		} else {
			userIndex++;
		}
		const nextPlayer = sessionData.players.at(userIndex);
		if (!nextPlayer) {
			return;
		}
		setCurrentTurn(nextPlayer);
	}, [hand, drawCards, setCurrentTurn, sessionData]);

	const canIMove = useMemo(() => {
		if (!sessionData || !myUser) return true;
		if (sessionData.firstMove === false) return true;
		return myUser.turn;
	}, [myUser, sessionData]);

	return {
		resetGame,
		onCardAdded,
		playCard,
		onNextButton,
		drawCards,
		startGame,
		connect,
		dataToDrag,
		playing,
		canPlay,
		deck,
		hand,
		stacks,
		players,
		canIMove,
	};
};
