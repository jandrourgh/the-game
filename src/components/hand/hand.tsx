import { useState } from "react";
import { Card } from "../card/card";
import styles from "./hand.module.scss";

type THandProps = {
	cards: number[];
	playCard: (number: number) => void;
};

export const Hand = ({ cards, playCard }: THandProps) => {
	const [playing, setPlaying] = useState<undefined | number>(undefined);
	return (
		<div className={styles.hand}>
			{cards.map((card) => (
				<Card
					playing={card === playing}
					number={card}
					key={`card-${card}`}
					playCard={() => {
						setPlaying(card);
						playCard(card);
					}}
				/>
			))}
		</div>
	);
};
