import styles from "./styles.module.css";
import {Header} from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";
import {useState} from "react";

function App() {
	const [headerShow] = useState<boolean>(true);
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
