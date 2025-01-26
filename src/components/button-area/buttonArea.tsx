import { FirebaseApp } from "firebase/app";
import { useCreate } from "../../hooks/useCreate";
import styles from "./buttonArea.module.scss";
import { useState } from "react";
// import { TSessionData } from "../../common/types";
import { useJoin } from "../../hooks/useJoin";
import { TUser } from "../../common/types";

type TButtonAreaProps = {
	online: boolean;
	setOnline: (online: boolean) => void;
	startGame: () => void;
	app: FirebaseApp;
	onSessionCreated: (roomID: string, user: TUser) => void;
	onSessionJoined: (roomID: string, user: TUser) => void;
	sessionFromURL: string;
};

export const ButtonArea: React.FC<TButtonAreaProps> = ({
	online,
	setOnline,
	app,
	onSessionCreated,
	onSessionJoined,
	startGame,
	sessionFromURL,
}) => {
	const [name, setName] = useState("");
	const { createSession, isInviting } = useCreate(
		app,
		name,
		onSessionCreated
	);
	const { joinSession } = useJoin(onSessionJoined, name);

	return (
		<div className={styles.buttonArea}>
			<div>
				<input
					type="checkbox"
					id="online-checkbox"
					name="online-checkbox"
					checked={online}
					onChange={() => setOnline(!online)}
				/>
				<label htmlFor="online-checkbox">Online</label>
			</div>
			{!online ? (
				<button onClick={() => startGame()}>START</button>
			) : (
				<>
					<div>
						<input
							className={styles.input}
							placeholder="Your name please"
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(evt) => setName(evt.target.value)}
						/>
					</div>
					<div className={styles.buttons}>
						<button
							disabled={name === "" || isInviting}
							onClick={() => createSession()}
						>
							CREATE GAME
						</button>
						<button
							disabled={name === "" || isInviting}
							onClick={() => joinSession(sessionFromURL)}
						>
							JOIN GAME
						</button>
					</div>
					{sessionFromURL !== "" && (
						<h2>Joining game {sessionFromURL}</h2>
					)}
				</>
			)}
		</div>
	);
};
