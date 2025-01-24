import { FirebaseApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { generateDeck, generateStacks } from "../common/utils";
import { useCallback, useState } from "react";
import { customAlphabet, nanoid } from "nanoid";
import { TSessionData, TUser } from "../common/types";
// import { TSessionData } from "../common/types";

export const useCreate = (
	app: FirebaseApp,
	name: string,
	onSessionCreated: (roomID: string, user: TUser) => void
) => {
	const db = getFirestore(app);
	const [isInviting, setIsinviting] = useState(false);
	const share = useCallback(
		async (id: string) => {
			const url = new URL(location.href);
			url.searchParams.append("session", id);
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
		setIsinviting(true);
		const uid = nanoid();
		const deck = generateDeck(98);
		const stacks = generateStacks();
		const myUser = { name: name, uid: uid, turn: false };
		const players: TUser[] = [myUser];
		const alphabet = "1234567890";
		const getRoomNumber = customAlphabet(alphabet, 6);
		const roomNumber = getRoomNumber();
		const sessionData: TSessionData = {
			owner: { name, uid, turn: false },
			deck: deck,
			stacks: stacks,
			players: players,
			firstMove: false,
		};
		await setDoc(doc(db, "matches", roomNumber), sessionData);
		share(roomNumber);
		onSessionCreated(roomNumber, myUser);
	};
	return { createSession, isInviting };
};
