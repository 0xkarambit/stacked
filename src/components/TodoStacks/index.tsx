import {FC} from "react";

import style from "./TodoStacks.module.css";
import type {StackI, StacksStateI} from "../../types/task";

interface props {
	stackState: StacksStateI;
	remove: (t: number, stackIdx: number) => void;
}

export const TaskStacks: FC<props> = ({stackState, remove}) => {
	const stackView = stackState.stacks.map((stack, stackIdx) => (
		<Stack
			selected={stackState.currentStackIdx == stackIdx}
			key={stack.name}
			remove={remove}
			name={stack.name}
			stackIdx={stackIdx}
			stack={stack}
		/>
	));
	return <div className={style.taskStacksFlex}>{stackView}</div>;
};

interface stackProps {
	name: string;
	stack: StackI;
	stackIdx: number;
	selected: boolean;
	remove: (t: number, stackIdx: number) => void;
}

const Stack: FC<stackProps> = ({name, stack, stackIdx, remove, selected}) => {
	return (
		// todo: change the active tasksStack when you click this !
		// active stack should have a solid bright green border, other should have a lower opacity
		<div
			data-selected={selected}
			data-name={name}
			className={style.stack}
			onClick={() => alert("Hello evernyian")}>
			<p>{stack.name}</p>
			{stack.tasks.map((task, taskIdx) => (
				// would this make tooo many functions ..... :hmmm
				<li onClick={() => remove(taskIdx, stackIdx)} key={taskIdx}>
					{task.isDone ? <s>{task.text}</s> : task.text}
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
