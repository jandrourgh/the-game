import { FC } from "react";
import { Stack, TStack } from "./stack/stack";
import styles from "./stacks.module.scss";

interface IStacksProps {
	dataToDrag: undefined | number;
	onCardAdded: (number: number, id: string) => void;
	stacks: TStack[];
}

export const Stacks: FC<IStacksProps> = ({
	dataToDrag,
	onCardAdded,
	stacks,
}) => {
	return (
		<div className={styles.stacks}>
			{stacks.map(({ direction, id }) => {
				return (
					<Stack
						direction={direction}
						id={id}
						onCardAdded={(number) => onCardAdded(number, id)}
						start={direction === "up" ? 1 : 100}
						toAdd={dataToDrag}
					/>
				);
			})}
		</div>
	);
};
