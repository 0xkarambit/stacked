import styles from "./styles.module.css";
import {Header} from "./components/Header";
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
			done: false,
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
	switch (action.type) {
		case "Add": {
			// This code does indeed cause 2 times entering of data
			/* 			const new_state = {
				...prevStackState,
				// But the tasks inside stacks still point to the same tasks !!!
				stacks: [...prevStackState.stacks]
			};
			new_state.stacks[new_state.currentStackIdx].tasks.push(action.task);

			return new_state; */

			return {
				...state,
				stacks: state.stacks.map((stack, idx) => {
					return idx !== state.currentStackIdx
						? stack
						: {
								...stack,
								tasks: [...stack.tasks, action.task]
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  };
				})
			};
		}

		case "Done": {
			const {stackIdx, taskIdx} = action;
			return {
				...state,
				stacks: state.stacks.map((stack, idx) => {
					const stackTasks = stack.tasks;
					return idx !== stackIdx
						? stack
						: {
								...stack,
								tasks: stackTasks.map((t, i) => {
									return i !== taskIdx
										? t
										: {
												...t,
												isDone: true
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  };
								})
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  };
				})
			};
		}
		default:
			break;
	}
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
