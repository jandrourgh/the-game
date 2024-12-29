import styles from "./card.module.scss";

export type TCard = {
	number: number;
	playCard?: (number: number) => void;
	playing?: boolean;
};

export const Card = (props: TCard) => {
	const { number, playCard, playing } = props;
	return (
		<div
			className={`${styles.card} ${playing && styles.playing}`}
			draggable
			onDragStart={() => playCard && playCard(number)}
			onClick={() => playCard && playCard(number)}
		>
			<h2>{number}</h2>
		</div>
	);
};
