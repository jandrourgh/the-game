import { useEffect, useMemo, useState } from "react";
import { TCard } from "./card";

import styles from "./stack.module.scss";

interface IStackProps {
	direction: "up" | "down";
	start: number;
	toAdd: undefined | number;
	onCardAdded: () => void;
}

export const Stack = ({
	toAdd,
	direction,
	onCardAdded,
	start,
}: IStackProps) => {
	const [cards, setCards] = useState<TCard[]>([]);
	const [okToAdd, setOkToAdd] = useState(false);

	const lastCard = useMemo(
		() => (cards.length ? cards[cards.length - 1].number : undefined),
		[cards]
	);

	const checkCards = (event: React.DragEvent<HTMLDivElement>) => {
		console.log("checkCards: ", lastCard);
		if (lastCard === undefined) return setOkToAdd(true);
		if (!toAdd) return;
		console.log(event.dataTransfer.dropEffect);
		// let effect = event.dataTransfer?.dropEffect;
		if (direction === "up") {
			const ok = toAdd > lastCard;
			// ok ? (effect = "move") : (effect = "none");
			setOkToAdd(ok);
		} else if (direction === "down") {
			const ok = toAdd < lastCard;
			// ok ? (effect = "move") : (effect = "none");
			setOkToAdd(ok);
		}
	};

	useEffect(() => {
		console.log("ok to add stack: ", okToAdd, lastCard);
	}, [okToAdd, lastCard]);

	const addCard = () => {
		console.log("addCard", toAdd);
		if (!toAdd) return;
		setCards([...cards, { number: toAdd }]);
		onCardAdded();
	};
	return (
		<div
			onDragEnter={(evt) => checkCards(evt)}
			onDragLeave={() => setOkToAdd(false)}
			onDragOver={(evt) => evt.preventDefault()}
			onDrop={(evt) => {
				evt.preventDefault();
				console.log("on drag end");
				if (okToAdd) addCard();
				setOkToAdd(false);
			}}
			className={styles.stack}
		>
			<h2>{`${start} -> ${direction}`}</h2>
			<h1>{cards.length ? lastCard : "-"}</h1>
		</div>
	);
};
