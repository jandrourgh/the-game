import { Card } from "./card";
import styles from "./deck.module.scss";

type TDeckProps = {
	cardToReveal: number;
	onDragStart: React.DragEventHandler<HTMLDivElement>;
};

export const Deck = ({ cardToReveal, onDragStart }: TDeckProps) => {
	return (
		<div className={styles.deck}>
			<div draggable>
				<Card number={cardToReveal} onDragStart={onDragStart} />
			</div>
		</div>
	);
};
