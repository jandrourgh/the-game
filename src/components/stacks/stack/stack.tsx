import { useMemo, useState } from "react";

import styles from "./stack.module.scss";
import { Card } from "../../card/card";
import { checkCardStack } from "../../../common/utils";

interface IStackProps {
	direction: "up" | "down";
	start: number;
	toAdd: undefined | number;
	onCardAdded: (number: number, direction: "up" | "down") => void;
	id: string;
}

export type TStack = {
	direction: "up" | "down";
	lastCardPlayed?: number;
	id: string;
};

export const Stack = ({
	toAdd,
	direction,
	onCardAdded,
	start,
	id,
}: IStackProps) => {
	const [cards, setCards] = useState<number[]>([]);
	const [okToAdd, setOkToAdd] = useState(false);

	const lastCard = useMemo(
		() => (cards.length ? cards[cards.length - 1] : undefined),
		[cards]
	);

	const getDirection = () => {
		if (direction == "up") return <>&uarr;</>;
		if (direction == "down") return <>&darr;</>;
	};

	const addCard = () => {
		if (!toAdd) return;
		setCards([...cards, toAdd]);
		onCardAdded(toAdd, direction);
	};
	return (
		<div
			onClick={() => {
				if (
					checkCardStack(toAdd, {
						direction: direction,
						id: id,
						lastCardPlayed: lastCard,
					})
				) {
					addCard();
				}
			}}
			onDragEnter={() =>
				setOkToAdd(
					checkCardStack(toAdd, {
						direction: direction,
						id: id,
						lastCardPlayed: lastCard,
					})
				)
			}
			onDragLeave={() => setOkToAdd(false)}
			onDragOver={(evt) => evt.preventDefault()}
			onDrop={(evt) => {
				evt.preventDefault();
				if (okToAdd) addCard();
				setOkToAdd(false);
			}}
			className={styles.stack}
		>
			<h2>
				{`${start}`} {getDirection()}
			</h2>

			<Card number={lastCard} />
		</div>
	);
};
