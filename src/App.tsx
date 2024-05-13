import styles from "./styles.module.css";
import {Header} from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";
import {useReducer} from "react";
import type {TaskI, StacksStateI, TaskAction, StackReducer} from "./types/task";
import {produce} from "immer";

// todo: dont chase perfection lmao
// can i make this a class....
const initialStackState: StacksStateI = {
	stacks: [
		{
			name: "Stack 0",
			isDone: false,
			tasks: [
				{
					id: 0,
					text: "Task 1",
					tags: [],
					isDone: false
				},
				{
					id: 1,
					text: "task 2",
					tags: [],
					isDone: false
				}
			]
		},
		{
			name: "Stack 1",
			isDone: false,
			tasks: [
				{
					id: 0,
					text: "Hello World",
					tags: [],
					isDone: false
				}
			]
		}
	],
	currentStackIdx: 0
};

const stackStateReducer = (state: StacksStateI, action: TaskAction) => {
	if (action.type == "Add") {
		return produce(state, draft => {
			draft.stacks[draft.currentStackIdx].tasks.push(action.task);
		});
	} else if (action.type == "Done") {
		const {stackIdx, taskIdx} = action;
		return produce(state, draft => {
			draft.stacks[stackIdx].tasks[taskIdx].isDone = true;
			if (draft.stacks[stackIdx].tasks.length == 0) {
				draft.stacks[stackIdx].isDone = true;
			}
		});
	}
	// just for ts to shut up lol
	return state;
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
