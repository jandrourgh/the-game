import { Card, TCard } from "./card";
import styles from "./hand.module.scss";

type THandProps = {
	cards: TCard[];
	onDragStart: React.DragEventHandler<HTMLDivElement>;
};
//TO DO - IMPLEMENTAR ONDRAGSTART PARA EL ARRAY DE CARDS
export const Hand = ({ cards, onDragStart }: THandProps) => {
	return (
		<div className={styles.hand}>
			{cards.map((card) => (
				<Card
					number={card.number}
					key={`card-${card.number}`}
					onDragStart={onDragStart}
				/>
			))}
		</div>
	);
};
