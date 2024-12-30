import { useMemo } from "react";
import { TStack } from "../components/stacks/stack/stack";
import { checkDeck } from "../common/utils";

export const useCanPlay = (
	hand: number[],
	stacks: TStack[],
	deck: number[]
) => {
	const canPlay = useMemo(() => {
		if (hand.length <= 4 && deck.length) {
			return true;
		}
		const canByStack = stacks.map((stack) =>
			hand.some((card) => checkDeck(card, stack))
		);
		return !hand.length || canByStack.find((value) => value === true);
	}, [hand, stacks, deck]);
	return {
		canPlay: canPlay,
	};
};
