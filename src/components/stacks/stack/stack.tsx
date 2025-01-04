import { useMemo, useState } from "react";

import styles from "./stack.module.scss";
import { Card } from "../../card/card";
import { checkDeck } from "../../../common/utils";
import { Direction } from "../../../common/enums";

interface IStackProps {
	direction: Direction;
	start: number;
	toAdd: undefined | number;
	onCardAdded: (number: number, direction: Direction) => void;
	id: string;
	cards: number[];
}

export type TStack = {
	direction: Direction;
	lastCardPlayed?: number;
	id: string;
	cards: number[];
};

export const Stack = ({
	toAdd,
	direction,
	onCardAdded,
	start,
	id,
	cards,
}: IStackProps) => {
	// const [cards, setCards] = useState<number[]>([]);
	const [okToAdd, setOkToAdd] = useState(false);
	const [show, setShow] = useState(false);
	const lastCard = useMemo(
		() => (cards.length ? cards[cards.length - 1] : undefined),
		[cards]
	);

	const getDirection = () => {
		if (direction == Direction.up) return <>&uarr;</>;
		if (direction == Direction.down) return <>&darr;</>;
	};

	const addCard = () => {
		if (!toAdd) return;
		onCardAdded(toAdd, direction);
	};

	return (
		<div>
			<div
				onClick={() => {
					if (
						checkDeck(toAdd, {
							direction: direction,
							id: id,
							lastCardPlayed: lastCard,
							cards: cards,
						})
					) {
						addCard();
					}
				}}
				onDragEnter={() =>
					setOkToAdd(
						checkDeck(toAdd, {
							direction: direction,
							id: id,
							lastCardPlayed: lastCard,
							cards: cards,
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
				{show && (
					<ul>
						{cards.map((card) => (
							<li key={card + "-" + id}>{card}</li>
						))}
					</ul>
				)}
			</div>
			<div>
				<button onClick={() => setShow(!show)}>show</button>
			</div>
		</div>
	);
};
