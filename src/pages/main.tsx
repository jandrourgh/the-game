import { useEffect, useState } from "react";
import { Reset } from "../components/reset/reset";
import { Stacks } from "../components/stacks/stacks";
import { Hand } from "../components/hand/hand";
import { useFirebase } from "../hooks/useFirebase";
import { ButtonArea } from "../components/button-area/buttonArea";
import { useGame } from "../hooks/useGame";
import styles from "./main.module.scss";
import { useSearchParams } from "react-router";

export const Main = () => {
	const { app } = useFirebase();
	const [searchParams] = useSearchParams();

	const [online, setOnline] = useState(true);

	const {
		canPlay,
		dataToDrag,
		deck,
		hand,
		stacks,
		init,
		onCardAdded,
		onNextButton,
		playCard,
		playing,
		resetGame,
		connect,
	} = useGame(app);

	useEffect(() => {
		console.log(searchParams);
		const session = searchParams.get("session");
		if (!session) return;
		connect(session);
	}, [searchParams, connect]);

	const onSessionCreated = (id: string) => {
		connect(id);
	};
	const onSessionJoined = (id: string) => {
		connect(id);
	};

	return (
		<>
			{!canPlay && (
				<Reset
					remaining={deck.length + hand.length}
					resetGame={resetGame}
				/>
			)}
			{playing ? (
				<>
					<Stacks
						remainingCards={deck.length + hand.length}
						onCardAdded={(number, id) => onCardAdded(number, id)}
						dataToDrag={dataToDrag}
						stacks={stacks}
					/>
					<Hand playCard={(card) => playCard(card)} cards={hand} />
					{/* to do: disabled dinámico con cartas jugadas */}
					<div className={styles.buttonArea}>
						<button
							disabled={hand.length > 4}
							onClick={onNextButton}
						>
							{hand.length > 4
								? `Play ${hand.length - 4} more`
								: "Next"}
						</button>
					</div>
				</>
			) : (
				<ButtonArea
					app={app}
					init={init}
					online={online}
					setOnline={setOnline}
					onSessionCreated={onSessionCreated}
					onSessionJoined={onSessionJoined}
				/>
			)}
		</>
	);
};
