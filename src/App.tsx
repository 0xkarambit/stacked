import styles from "./styles.module.css";
import {Header} from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";
import {useEffect, useState} from "react";

function App() {
	const [headerState, setHeaderState] = useState<boolean>(true);
	// toggles very fast if i place this inside the useEffect
	const listener = (e: KeyboardEvent) => {
		if (e.key === "h" && e.ctrlKey) {
			e.preventDefault();
			setHeaderState(s => !s);
		}
	};
	useEffect(() => {
		document.addEventListener("keydown", listener);
		return () => removeEventListener("keydown", listener);
	}, []);

	return (
		<>
			{headerState && <Header />}
			<div className={styles.layoutContainer}>
				<TodoForm />
				<TaskStacks />
			</div>
		</>
	);
}

export default App;
