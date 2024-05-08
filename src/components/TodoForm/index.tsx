import {submitBehaviour, useSingleInput} from "../../hooks/input";
import {type FC} from "react";
import {Task} from "../../types/task";

import css from "./TodoForm.module.css";

const PLACEHOLDER_TEXT = "Enter your task !";
const TAGS_REGEXP = /#(\w+)\s?/g;

interface props {
	addTask: (t: Task) => void;
}

const counter = (() => {
	let c = 0;
	return () => c++;
})();

export const TodoForm: FC<props> = ({addTask}) => {
	// todo: use a useRef to abstract away handle* functions

	const onSubmit = (text: string) => {
		const tags = [...text.matchAll(TAGS_REGEXP)].map(m => m[1]); // getting the first capture group from the matches
		addTask({
			id: counter(),
			isDone: false,
			tags,
			text: text
		});
	};
	const [title, , handleChange, submitOnEnter] = useSingleInput(
		"",
		onSubmit,
		submitBehaviour.DEFAULT
	);

	return (
		<form className={css.form} action="#">
			<input
				type="text"
				placeholder={PLACEHOLDER_TEXT}
				value={title}
				onChange={handleChange}
				onKeyDown={submitOnEnter}
			/>
		</form>
	);
};
