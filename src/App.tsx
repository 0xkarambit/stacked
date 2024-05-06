import styles from "./styles.module.css";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoStacks from "./components/TodoStacks";

function App() {
	// Routing Info
	return (
		<>
			<Header></Header>
			{/* This could have just been a div :hmm */}
			<div className={styles.layoutContainer}>
				<TodoForm></TodoForm>
				<TodoStacks></TodoStacks>
			</div>
		</>
	);
}

export default App;
