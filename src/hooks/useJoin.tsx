export const useJoin = (onSessionJoined: (roomID: string) => void) => {
	const joinSession = (sessionFromURL: string) => {
		if (sessionFromURL !== "") {
			console.log(sessionFromURL);
			onSessionJoined(sessionFromURL);
			return;
		}
		const session = prompt("Insert match ID");
		if (session) {
			onSessionJoined(session);
		}
	};
	return { joinSession };
};
