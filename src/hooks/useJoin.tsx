import { FirebaseApp } from "firebase/app";

export const useJoin = (app: FirebaseApp, id: string) => {
	return { app, id };
};
