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
			key={stack.name}
			remove={remove}
			name={stack.name}
			stackIdx={stackIdx}
			stack={stack}
		/>
	));
	return <div className={style.taskStacks}>{stackView}</div>;
};

interface stackProps {
	name: string;
	stack: StackI;
	stackIdx: number;
	remove: (t: number, stackIdx: number) => void;
}

const Stack: FC<stackProps> = ({name, stack, stackIdx, remove}) => {
	return (
		<div data-name={name} className={style.stack}>
			{stack.tasks.map((task, taskIdx) => (
				// would this make tooo many functions ..... :hmmm
				<li onClick={() => remove(taskIdx, stackIdx)} key={taskIdx}>
					{task.text}
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
