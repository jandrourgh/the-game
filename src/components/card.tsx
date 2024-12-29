import styles from "./card.module.scss";

export type TCard = {
	number: number;
	onDragStart: React.DragEventHandler<HTMLDivElement>;
};

export const Card = (props: TCard) => {
	const { number, onDragStart } = props;
	return (
		<div className={styles.card} draggable onDragStart={onDragStart}>
			<h2>{number}</h2>
		</div>
	);
};
