import { FirebaseApp } from "firebase/app";
import { useCreate } from "../../hooks/useCreate";
import styles from "./buttonArea.module.scss";
import { useEffect, useState } from "react";
// import { TSessionData } from "../../common/types";
import { useJoin } from "../../hooks/useJoin";

type TButtonAreaProps = {
	online: boolean;
	setOnline: (online: boolean) => void;
	init: (number: number) => void;
	app: FirebaseApp;
	onSessionCreated: (roomID: string) => void;
	onSessionJoined: (roomID: string) => void;
};

export const ButtonArea: React.FC<TButtonAreaProps> = ({
	online,
	setOnline,
	init,
	app,
	onSessionCreated,
	onSessionJoined,
}) => {
	const [name, setName] = useState("");
	const { createSession, roomID, isInviting } = useCreate(app, name);
	const { joinSession, id } = useJoin();

	useEffect(() => {
		if (id) {
			onSessionJoined(id);
		}
	}, [id, onSessionJoined]);

	useEffect(() => {
		if (roomID) {
			onSessionCreated(roomID);
		}
	}, [roomID, onSessionCreated]);

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
				<button onClick={() => init(0)}>START</button>
			) : (
				<>
					<input
						placeholder="Your name please"
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(evt) => setName(evt.target.value)}
					/>

					<div className={styles.buttons}>
						<button
							disabled={name === "" || isInviting}
							onClick={() => createSession()}
						>
							CREATE GAME
						</button>
						<button
							disabled={name === "" || isInviting}
							onClick={() => joinSession()}
						>
							JOIN GAME
						</button>
					</div>
				</>
			)}
		</div>
	);
};
