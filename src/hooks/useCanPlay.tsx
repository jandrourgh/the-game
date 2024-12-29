import { useMemo } from "react";
import { TStack } from "../components/stacks/stack/stack";
import { checkCardStack } from "../common/utils";

export const useCanPlay = (hand: number[], stacks: TStack[]) => {
	const canPlay = useMemo(() => {
		const canByStack = stacks.map((stack) =>
			hand.some((card) => checkCardStack(card, stack))
		);
		return !hand.length || canByStack.find((value) => value === true);
	}, [hand, stacks]);
	return {
		canPlay: canPlay,
	};
};
