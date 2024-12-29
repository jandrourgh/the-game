import styles from "./card.module.scss";

export type TCard = {
	number: number | undefined;
	playCard?: (number: number) => void;
	playing?: boolean;
};

export const Card = (props: TCard) => {
	const { number, playCard, playing } = props;
	const isNumber = Number(number) > 0;
	return (
		<div
			className={`${styles.card} ${playing && styles.playing} ${
				!isNumber && styles.nan
			}`}
			draggable
			onDragStart={() => number && playCard && playCard(number)}
			onClick={() => number && playCard && playCard(number)}
		>
			<h2>{isNumber ? number : "-"}</h2>
		</div>
	);
};
