import { FirebaseApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { generateDeck, generateStacks } from "../common/utils";
import { useCallback, useState } from "react";
import { customAlphabet, nanoid } from "nanoid";
import { TSessionData } from "../common/types";
// import { TSessionData } from "../common/types";

export const useCreate = (
	app: FirebaseApp,
	name: string,
	onSessionCreated: (roomID: string, sessionData: TSessionData) => void
) => {
	const db = getFirestore(app);
	const [isInviting, setIsinviting] = useState(false);
	const share = useCallback(
		async (id: string) => {
			const url = new URL(location.href);
			url.searchParams.append("session", id);
			console.log(url);
			const shareData: ShareData = {
				title: "The Game Invitation",
				text: `${name} wants you to play The Game`,
				url: url.toString(),
			};
			navigator.share(shareData);
			setIsinviting(false);
		},
		[name]
	);

	const createSession = async () => {
		console.log("CREATE SESSION");
		setIsinviting(true);
		const uid = nanoid();
		const deck = generateDeck(98);
		const stacks = generateStacks();
		const players = [{ name: name, uid: uid }];
		const alphabet = "1234567890";
		const getRoomNumber = customAlphabet(alphabet, 6);
		const roomNumber = getRoomNumber();
		const sessionData: TSessionData = {
			owner: uid,
			deck: deck,
			stacks: stacks,
			players: players,
		};
		await setDoc(doc(db, "matches", roomNumber), sessionData);
		share(roomNumber);
		onSessionCreated(roomNumber, sessionData);
	};
	return { createSession, isInviting };
};
