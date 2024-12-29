import { useMemo, useState } from "react";

import styles from "./stack.module.scss";
import { Card } from "../../card/card";

interface IStackProps {
	direction: "up" | "down";
	start: number;
	toAdd: undefined | number;
	onCardAdded: (number: number) => void;
}

export const Stack = ({
	toAdd,
	direction,
	onCardAdded,
	start,
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

	const checkCards = () => {
		if (lastCard === undefined) return true;
		if (!toAdd) return false;
		let ok = undefined;
		if (direction === "up") {
			ok = toAdd > lastCard;
		} else if (direction === "down") {
			ok = toAdd < lastCard;
		}
		if (toAdd - 10 == lastCard || lastCard - 10 == toAdd) {
			ok = true;
		}
		return Boolean(ok);
		// setOkToAdd(Boolean(ok));
	};

	const addCard = () => {
		if (!toAdd) return;
		setCards([...cards, toAdd]);
		onCardAdded(toAdd);
	};
	return (
		<div
			onClick={() => {
				if (checkCards()) {
					addCard();
				}
			}}
			onDragEnter={() => setOkToAdd(checkCards())}
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
