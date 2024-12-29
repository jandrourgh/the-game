import { useMemo } from "react";
import { TStack } from "../components/stacks/stack/stack";

export const useCanPlay = (hand: number[], stacks: TStack[]) => {
	const canPlay = useMemo(() => {
		const canByStack = stacks.map((stack) => {
			const can = stack.lastCardPlayed === undefined || false;
			if (stack.direction === "down") {
				return hand.some((card) =>
					stack.lastCardPlayed && card < stack.lastCardPlayed
						? true
						: can
				);
			} else {
				return hand.some((card) =>
					stack.lastCardPlayed && card > stack.lastCardPlayed
						? true
						: can
				);
			}
		});
		return !hand.length || canByStack.find((value) => value === true);
	}, [hand, stacks]);
	return {
		canPlay: canPlay,
	};
};
