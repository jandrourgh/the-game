import { Stack } from "./stack/stack";
import styles from "./stacks.module.scss";

type TStacksProps = {
	dataToDrag: undefined | number;
	onCardAdded: (number: number) => void;
};

export const Stacks = ({ dataToDrag, onCardAdded }: TStacksProps) => {
	return (
		<div className={styles.stacks}>
			<Stack
				key="stack-1"
				direction="up"
				start={1}
				toAdd={dataToDrag}
				onCardAdded={onCardAdded}
			/>
			<Stack
				key="stack-2"
				direction="up"
				start={1}
				toAdd={dataToDrag}
				onCardAdded={onCardAdded}
			/>
			<Stack
				key="stack-3"
				direction="down"
				start={100}
				toAdd={dataToDrag}
				onCardAdded={onCardAdded}
			/>
			<Stack
				key="stack-4"
				direction="down"
				start={100}
				toAdd={dataToDrag}
				onCardAdded={onCardAdded}
			/>
		</div>
	);
};
