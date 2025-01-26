import { FC } from "react";
import { Stack, TStack } from "./stack/stack";
import styles from "./stacks.module.scss";
import { Direction } from "../../common/enums";

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
		<>
			<div className={styles.stacks}>
				{stacks.map(({ direction, id, cards }) => {
					return (
						<Stack
							direction={direction}
							key={id}
							id={id}
							onCardAdded={(number) => onCardAdded(number, id)}
							start={direction === Direction.up ? 1 : 100}
							toAdd={dataToDrag}
							cards={cards}
						/>
					);
				})}
			</div>
		</>
	);
};
