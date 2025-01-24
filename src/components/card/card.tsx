import styles from "./card.module.scss";

export type TCard = {
	number: number | undefined;
	playCard?: (number: number) => void;
	playing?: boolean;
	disabled?: boolean;
};

export const Card = (props: TCard) => {
	const { number, playCard, playing, disabled } = props;
	const isNumber = Number(number) > 0;
	return (
		<div
			className={`${styles.card} ${playing && styles.playing} ${
				(!isNumber || disabled) && styles.nan
			}`}
			draggable
			onDragStart={() => number && playCard && playCard(number)}
			onClick={() => number && playCard && playCard(number)}
		>
			<h2>{isNumber ? number : "-"}</h2>
		</div>
	);
};
