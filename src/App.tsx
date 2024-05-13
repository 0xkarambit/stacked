import styles from "./styles.module.css";
import {Header} from "./components/Header";
import {TodoForm} from "./components/TodoForm";
import {TaskStacks} from "./components/TodoStacks";

// todo: dont chase perfection lmao
// can i make this a class....

function App() {
	return (
		<>
			<Header></Header>
			<div className={styles.layoutContainer}>
				<TodoForm />
				<TaskStacks />
			</div>
		</>
	);
}

export default App;
