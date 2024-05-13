import {submitBehaviour, useSingleInput} from "../../hooks/input";
import {useRef, type FC} from "react";

import css from "./TodoForm.module.css";
import {extract_tags} from "../../utils/tasks";
import {useStackState} from "../../stores/stacks";

const PLACEHOLDER_TEXT = "Enter your task ! Press Enter to submit.";

interface props {}

export const TodoForm: FC<props> = () => {
	// todo: use a useRef to abstract away handle* functions
	const addTask = useStackState(s => s.addTask);

	const inputElm = useRef<HTMLInputElement>(null);
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

	const [taskText, , handleChange, submitOnEnter] = useSingleInput(
		"",
		onSubmit, // todo: change this
		submitBehaviour.DEFAULT
	);

	return (
		<div className={css.form}>
			{/* <select name="selected-stack">
				<option value="Stack 0" selected>
					Stack 0
				</option>
			</select> */}
			<input
				type="text"
				autoFocus
				placeholder={PLACEHOLDER_TEXT}
				value={taskText}
				ref={inputElm}
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
