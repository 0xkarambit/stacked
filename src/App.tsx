import styles from "./styles.module.css";
import {Header} from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";
import {useEffect, useState} from "react";

function App() {
	const [headerShow, setHeaderState] = useState<boolean>(true);
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			console.log(e);
			if (e.key == "h" && e.ctrlKey) {
				e.preventDefault();
				setHeaderState(s => !s);
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			removeEventListener("keydown", listener);
		};
	}, []);
	return (
		<>
			{headerShow && <Header></Header>}
			<div className={styles.layoutContainer}>
				<TodoForm />
				<TaskStacks />
			</div>
		</>
	);
}

export default App;
