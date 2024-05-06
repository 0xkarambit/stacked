import css from "./TodoForm.module.css";
import {submitBehaviour, useSingleInput} from "../../hooks/input";

const PLACEHOLDER_TEXT = "Enter your task !";

export default function TodoForm() {
	const onSubmit = (v: string) => {
		console.log(v);
		console.log("Value Submitted");
	};

	// todo: use a useRef to abstract away handle* functions
	const [title, , handleChange, handleInput] = useSingleInput(
		"",
		onSubmit,
		submitBehaviour.DEFAULT
	);

	return (
		<form className={css.form}>
			<input
				type="text"
				placeholder={PLACEHOLDER_TEXT}
				value={title}
				onChange={handleChange}
				onKeyDown={handleInput}
			/>
			{/* Bloat */}
			<input type="button" value="Add" />
			{/* <SubTask></SubTask> */}
		</form>
	);
}

// function SubTask() {
// 	return <input type="text" />
// }
