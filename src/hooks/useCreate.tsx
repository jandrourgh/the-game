import { FirebaseApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { generateDeck, generateStacks } from "../common/utils";
import { useCallback, useState } from "react";
import { customAlphabet, nanoid } from "nanoid";
// import { TSessionData } from "../common/types";

export const useCreate = (app: FirebaseApp, name: string) => {
	const db = getFirestore(app);
	const [isInviting, setIsinviting] = useState(false);
	const [roomID, setRoomId] = useState<undefined | string>(undefined);

	const share = useCallback(
		async (id: string) => {
			const shareData: ShareData = {
				title: "The Game Invitation",
				text: `${name} wants you to play The Game`,
				url: `${location.href}${id}/`,
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
		const stacks = generateStacks().map((stack) => ({
			direction: stack.direction,
			id: stack.id,
		}));
		const players = [{ name: name, uid: uid }];
		const alphabet = "1234567890";
		const getRoomNumber = customAlphabet(alphabet, 6);
		const roomNumber = getRoomNumber();
		await setDoc(doc(db, "matches", roomNumber), {
			owner: uid,
			deck: deck,
			stacks: stacks,
			players: players,
		});

		share(roomNumber);
		setRoomId(roomNumber);
	};
	return { createSession, isInviting, roomID };
};
