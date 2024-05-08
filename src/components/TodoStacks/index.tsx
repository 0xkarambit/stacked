import {FC} from "react";

import style from "./TodoStacks.module.css";
import {Task} from "../../types/task";

interface props {
	tasks: Task[];
}

// const TodoStacks = ({notes: Note}) => {
export const TaskStacks: FC<props> = ({tasks}) => {
	const stackView = tasks.map(s => <li>{s.text}</li>);
	return <div className={style.taskStacks}>{stackView}</div>;
};

export const Stack = () => {
	return <div>Stack</div>;
};
