import { useState } from "react";
import { Card } from "../card/card";
import styles from "./hand.module.scss";

type THandProps = {
	cards: number[];
	playCard: (number: number) => void;
	enabled: boolean;
};

export const Hand = ({ cards, playCard, enabled }: THandProps) => {
	const [playing, setPlaying] = useState<undefined | number>(undefined);
	return (
		<div className={styles.hand}>
			{cards.map((card) => (
				<Card
					disabled={!enabled}
					playing={card === playing}
					number={card}
					key={`card-${card}`}
					playCard={() => {
						if (!enabled) return;
						setPlaying(card);
						playCard(card);
					}}
				/>
			))}
		</div>
	);
};
