import styles from "./styles.module.css";
import Header from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";
import {useReducer} from "react";
import type {TaskI, StacksStateI, TaskAction, StackReducer} from "./types/task";

// todo: dont chase perfection lmao
// can i make this a class....
const initialStackState: StacksStateI = {
	stacks: [
		{
			name: "Stack 0",
			done: false,
			tasks: []
		}
	],
	currentStack: undefined
};
initialStackState.currentStack = initialStackState.stacks[0];

const stackStateReducer = (
	prevStackState: StacksStateI,
	action: TaskAction
) => {
	const {type} = action;
	const copy = {...prevStackState};
	switch (type) {
		case "Add":
			copy.currentStack?.tasks.push(action.task);
			break;

		case "Done": {
			const {stackIdx, taskIdx} = action;
			copy.stacks[stackIdx].tasks.splice(taskIdx, 1);
			break;
		}
		default:
			break;
	}
	return copy;
};

function App() {
	const [stackState, stackDispatch] = useReducer<StackReducer>(
		stackStateReducer,
		initialStackState
	);

	const removeTask = (t: number, stackIdx: number) => {
		stackDispatch({
			type: "Done",
			taskIdx: t,
			stackIdx
		});
	};

	const addTask = (t: TaskI) => {
		stackDispatch({
			type: "Add",
			task: t
		});
	};

	return (
		<>
			<Header></Header>
			<div className={styles.layoutContainer}>
				<TodoForm addTask={addTask} />
				<TaskStacks remove={removeTask} stackState={stackState} />
			</div>
		</>
	);
}

export default App;
