import {FC} from "react";

import style from "./TodoStacks.module.css";
import {StackI, TaskI, useStacksState} from "../../stores/stacksState";

interface props {}

export const TaskStacks: FC<props> = () => {
	const [stacks, currentStackIdx] = useStacksState(s => [
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
	const [changeCurrentStackIdx, markTaskDone] = useStacksState(s => [
		s.changeCurrentStackIdx,
		s.toggleTaskCompletion
	]);

	// we can probably write this in a better way
	const tasksDone = [];
	const tasksLeft = [];
	for (const i in stack.tasks) {
		const t = stack.tasks[i];
		if (t.isDone) {
			tasksDone.push(<Task task={t} key={i} />);
		} else {
			tasksLeft.push(
				<Task
					task={t}
					key={i}
					markAsDone={() => {
						// Yes i write typescript, hmmm
						markTaskDone(stackIdx, i as unknown as number);
					}}
				/>
			);
		}
	}

	return (
		<div
			data-selected={selected}
			className={style.stack}
			onClick={() => changeCurrentStackIdx(stackIdx)}>
			<p>{stack.name}</p>
			{tasksLeft}
			{tasksDone}
		</div>
	);
};

interface TaskProps {
	task: TaskI;
	markAsDone?: () => void;
}

const TEXT_LIMIT = 180;

const Task: FC<TaskProps> = ({task, markAsDone}) => {
	const text = task.text.slice(0, TEXT_LIMIT);
	return (
		<li onDoubleClick={markAsDone} title={task.text}>
			<span data-done={task.isDone}>{text}</span>
		</li>
	);
};
