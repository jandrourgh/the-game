import { FirebaseApp } from "firebase/app";
import {
	getDoc,
	getFirestore,
	doc,
	DocumentData,
	DocumentReference,
	setDoc,
	onSnapshot,
} from "firebase/firestore";
import { TSessionData } from "../common/types";
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
	const db = useMemo(() => getFirestore(app), [app]);

	const connect = useCallback(
		async (roomID: string) => {
			setLoading(true);
			const roomRef = doc(db, "matches", roomID);
			const roomDoc = await getDoc(roomRef);
			if (roomDoc.exists()) {
				setSessionData(roomDoc.data() as TSessionData);
				setRoom(roomRef);
				onSnapshot(roomRef, (evt) => {
					setSessionData(evt.data() as TSessionData);
				});
			} else {
				setError("Error getting data");
			}
			setLoading(false);
		},
		[db]
	);

	const updateStacks = async (stacks: TStack[]) => {
		if (!room || !sessionData) return;
		const newSessionData: TSessionData = { ...sessionData, stacks: stacks };
		await setDoc(room, newSessionData);
	};

	const updateDeck = async (deck: number[]) => {
		if (!room || !sessionData) return;
		const newSessionData: TSessionData = { ...sessionData, deck: deck };
		await setDoc(room, newSessionData);
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
	};
};
