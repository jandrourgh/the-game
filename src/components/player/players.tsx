import { TUser } from "../../common/types";
import styles from "./players.module.scss";
interface IPlayerProps {
	players: (TUser & { itsMe: boolean })[];
}

export const Players = ({ players }: IPlayerProps) => {
	return (
		<div className={styles.container}>
			{players.map((player) => (
				<div
					className={`${styles.player} ${player.turn && styles.turn}`}
				>
					<i
						className={`${
							player.itsMe
								? "bi-person-arms-up"
								: "bi-person-standing"
						}`}
					/>
					<br />
					{player.name}
				</div>
			))}
		</div>
	);
};
