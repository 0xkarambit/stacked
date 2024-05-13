import {FC} from "react";

import style from "./TodoStacks.module.css";
import type {StackI} from "../../types/task";
import {useStackState} from "../../stores/stacks";

interface props {}

export const TaskStacks: FC<props> = () => {
	const [stacks, currentStackIdx] = useStackState(s => [
		s.stacks,
		s.currentStackIdx
	]);
	const stackView = stacks.map((stack, stackIdx) => (
		<Stack
			selected={currentStackIdx == stackIdx}
			key={stack.name}
			stackIdx={stackIdx}
			stack={stack}
		/>
	));
	return <div className={style.taskStacksFlex}>{stackView}</div>;
};

interface stackProps {
	stack: StackI;
	stackIdx: number;
	selected: boolean;
}

const Stack: FC<stackProps> = ({stack, stackIdx, selected}) => {
	const [changeCurrentStackIdx, remove] = useStackState(s => [
		s.changeCurrentStackIdx,
		s.markTaskDone
	]);
	return (
		<div
			data-selected={selected}
			className={style.stack}
			onClick={() => changeCurrentStackIdx(stackIdx)}>
			<p>{stack.name}</p>
			{stack.tasks.map((task, taskIdx) => (
				// would this make tooo many functions ..... :hmmm
				<li
					onClick={() => remove(taskIdx, stackIdx)}
					key={taskIdx}
					title={task.text}>
					<span data-done={task.isDone}> {task.text}</span>
					<input
						type="checkbox"
						name="isDone"
						checked={task.isDone}
					/>
				</li>
			))}
		</div>
	);
};
