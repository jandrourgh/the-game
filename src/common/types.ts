import { TStack } from "../components/stacks/stack/stack";

export type TUser = {
	name: string;
	uid: string;
};

export type TSessionData = {
	owner: TUser;
	deck: number[];
	stacks: TStack[];
	players: TUser[];
};
