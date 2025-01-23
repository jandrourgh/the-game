import { TUser } from "../common/types";
import { nanoid } from "nanoid";

export const useJoin = (
	onSessionJoined: (roomID: string, user: TUser) => void,
	name: string
) => {
	const joinSession = (sessionFromURL: string) => {
		const user: TUser = { name, uid: nanoid() };
		if (sessionFromURL !== "") {
			onSessionJoined(sessionFromURL, user);
			return;
		}
		const session = prompt("Insert match ID");
		if (session) {
			onSessionJoined(session, user);
		}
	};
	return { joinSession };
};
