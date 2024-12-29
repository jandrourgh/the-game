import { useMemo } from "react";
import styles from "./reset.module.scss";

type TResetProps = {
	remaining: number;
	resetGame: () => void;
};
export const Reset = ({ remaining, resetGame }: TResetProps) => {
	const message = useMemo(() => {
		if (remaining > 90) {
			return "Do not tell your friends about this.";
		} else if (remaining > 50) {
			return "Keep trying, it's not easy.";
		} else if (remaining > 30) {
			return "Well done.";
		} else if (remaining > 10) {
			return "Almost there!";
		} else if (remaining > 0) {
			return "Excellent!";
		} else {
			return "You beat the game!";
		}
	}, [remaining]);
	return (
		<div className={styles.reset}>
			<h1>
				You <u>{remaining != 0 ? "LOST" : "WON"}</u>
			</h1>
			<h2>{remaining} cards remaining.</h2>
			<h2>{message}</h2>
			<button onClick={() => resetGame()}>Reset Game</button>
		</div>
	);
};
