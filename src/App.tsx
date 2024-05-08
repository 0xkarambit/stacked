import styles from "./styles.module.css";
import Header from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";
import {useReducer} from "react";
import {Task, TaskReducer} from "./types/task";

// todo: dont chase perfection lmao

function App() {
	const [tasks, tasksDispatch] = useReducer<TaskReducer>((tasks, action) => {
		switch (action.type) {
			case "Add":
				return [...tasks, action.task];

			default:
				return tasks;
				break;
		}
	}, []);

	const addTask = (t: Task) =>
		tasksDispatch({
			type: "Add",
			task: t
		});

	// Routing Info
	return (
		<>
			<Header></Header>
			{/* This could have just been a div :hmm */}
			<div className={styles.layoutContainer}>
				<TodoForm addTask={addTask}></TodoForm>
				<TaskStacks tasks={tasks}></TaskStacks>
			</div>
		</>
	);
}

export default App;
