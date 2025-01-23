import { TUser } from "../../common/types";
import styles from "./player.module.scss";

interface IPlayerProps {
	players: (TUser & { itsMe: boolean })[];
}

export const Players = ({ players }: IPlayerProps) => {
	return (
		<div className={styles.container}>
			{players.map((player) => (
				<div
					className={`${styles.player} ${
						player.itsMe && styles.itsMe
					}`}
				>
					{player.itsMe ? "Me" : player.name}
				</div>
			))}
		</div>
	);
};
