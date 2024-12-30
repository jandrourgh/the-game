import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	addDoc,
	getFirestore,
	DocumentReference,
	DocumentData,
} from "firebase/firestore";
import { generateDeck, generateStacks } from "../common/utils";
import { useCallback, useState } from "react";

export const useCreate = (app: FirebaseApp, name: string) => {
	const [docRef, setDocRef] = useState<
		DocumentReference<DocumentData, DocumentData> | undefined
	>(undefined);
	const db = getFirestore(app);
	const auth = getAuth();
	const [isInviting, setIsinviting] = useState(false);

	const share = useCallback(
		async (ref: typeof docRef) => {
			setDocRef(ref);
			const shareData: ShareData = {
				title: "The Game Invitation",
				text: `${name} wants you to play The Game`,
				url: `${location.href}${ref?.id}/`,
			};
			await navigator.share(shareData);
			setIsinviting(false);
		},
		[name]
	);

	const createSession = async () => {
		setIsinviting(true);
		const ref = await addDoc(collection(db, "matches"), {
			owner: auth.currentUser,
			deck: generateDeck(98),
			stacks: generateStacks().map((stack) => ({
				direction: stack.direction,
				id: stack.id,
			})),
			players: [{ name: name, uid: auth.currentUser }],
		});
		if (ref) {
			share(ref);
		} else {
			setIsinviting(false);
		}
	};
	return { createSession, isInviting, docRef };
};
