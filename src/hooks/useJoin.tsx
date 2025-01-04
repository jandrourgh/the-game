import { useState } from "react";

export const useJoin = () => {
	const [id, setId] = useState<string | null>("");
	const joinSession = () => {
		const session = prompt("Insert match ID");

		setId(session);
	};
	return { joinSession, id };
};
