import { FirebaseApp } from "firebase/app";
import {
	getDoc,
	getFirestore,
	doc,
	DocumentData,
	DocumentReference,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { TSessionData, TUser } from "../common/types";
import { useCallback, useMemo, useState } from "react";
import { TStack } from "../components/stacks/stack/stack";

export const useOnline = (app: FirebaseApp) => {
	const [sessionData, setSessionData] = useState<TSessionData | undefined>(
		undefined
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [room, setRoom] = useState<
		DocumentReference<DocumentData, DocumentData> | undefined
	>(undefined);
	const [myUser, setMyUser] = useState<TUser | undefined>(undefined);
	const db = useMemo(() => getFirestore(app), [app]);

	const connect = useCallback(
		async (roomID: string, user: TUser) => {
			console.log("connect", { user });
			setMyUser(user);
			setLoading(true);
			const roomRef = doc(db, "matches", roomID);
			const roomDoc = await getDoc(roomRef);
			setLoading(false);
			if (roomDoc.exists()) {
				console.log("roomdoc existe");
				const roomDocData = roomDoc.data() as TSessionData;
				if (
					roomDocData.players.every(
						(player) => player.uid !== user.uid
					)
				) {
					console.log("existe", user);
					await updateDoc(roomRef, {
						players: [...roomDocData.players, user],
					}).then(() => console.log("he updateado ----"));
				}
				setSessionData(roomDocData);
				setRoom(roomRef);
				onSnapshot(roomRef, (evt) => {
					console.log("on snapshot");
					setSessionData(evt.data() as TSessionData);
				});
				return Promise.resolve(true);
			} else {
				setError("Error getting data");
				return Promise.reject("Error getting data");
			}
		},
		[db]
	);

	const updateStacks = async (stacks: TStack[]) => {
		if (!room || !sessionData) return;
		// const newSessionData: TSessionData = { ...sessionData, stacks: stacks };
		await updateDoc(room, { stacks: stacks });
	};

	const updateDeck = async (deck: number[]) => {
		if (!room || !sessionData) return;
		// const newSessionData: TSessionData = { ...sessionData, deck: deck };
		console.log(deck.length);
		await updateDoc(room, { deck: deck });
	};

	const nextTurn = async (id: string) => {
		console.log(id);
	};

	return {
		connect,
		updateStacks,
		updateDeck,
		nextTurn,
		sessionData,
		loading,
		error,
		myUser,
	};
};
