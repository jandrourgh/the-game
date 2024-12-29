import { useMemo } from "react";
import { TStack } from "../components/stacks/stack/stack";
import { checkCardStack } from "../common/utils";

export const useCanPlay = (
	hand: number[],
	stacks: TStack[],
	cardStack: number[]
) => {
	const canPlay = useMemo(() => {
		if (hand.length <= 4 && cardStack.length) {
			return true;
		}
		const canByStack = stacks.map((stack) =>
			hand.some((card) => checkCardStack(card, stack))
		);
		return !hand.length || canByStack.find((value) => value === true);
	}, [hand, stacks, cardStack]);
	return {
		canPlay: canPlay,
	};
};
