export const useJoin = (onSessionJoined: (roomID: string) => void) => {
	const joinSession = () => {
		const session = prompt("Insert match ID");

		if (session) {
			onSessionJoined(session);
		}
	};
	return { joinSession };
};
