import {submitBehaviour, useSingleInput} from "../../hooks/input";
import {type FC} from "react";
import {TaskI} from "../../types/task";

import css from "./TodoForm.module.css";
import {extract_tags} from "../../utils/tasks";

const PLACEHOLDER_TEXT = "Enter your task ! Press Enter to submit.";

interface props {
	addTask: (t: TaskI) => void;
}

export const TodoForm: FC<props> = ({addTask}) => {
	// todo: use a useRef to abstract away handle* functions

	const onSubmit = (text: string) => {
		const tags = extract_tags(text);
		addTask({
			// * Apparently a weird bug happens when i use `id` as the key lmao
			// why does this happend :hmm
			id: Math.random() * 1000,
			isDone: false,
			tags,
			text
		});
	};

	const [title, , handleChange, submitOnEnter] = useSingleInput(
		"",
		onSubmit,
		submitBehaviour.DEFAULT
	);

	return (
		<div className={css.form}>
			<input
				type="text"
				autoFocus
				placeholder={PLACEHOLDER_TEXT}
				value={title}
				onChange={handleChange}
				onKeyDown={submitOnEnter}
			/>
			{/* <Cursor offset={10}></Cursor> */}
		</div>
	);
};

// const Cursor: FC<{offset: number}> = ({offset}) => {
// 	return (
// 		<div data-offset={offset} className={css.cursor}>
// 			&#9608;
// 		</div>
// 	);
// };
