import {useRef, useState, type FC} from "react";

import css from "./TodoForm.module.css";
import {extract_tags} from "../../utils/tasks";
import {useStacksState} from "../../stores/stacksState";

const PLACEHOLDER_TEXT = "Enter your task ! Press Enter to submit.";
const TEXTAREA_PLACEHOLDER = "Write some more description";

interface props {}

export const TodoForm: FC<props> = () => {
	const addTask = useStacksState(s => s.addTask);

	const inputElementRef = useRef<HTMLInputElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const [descBoxState, setDescBoxState] = useState<boolean>(false);
	const [desc, setDesc] = useState<string>("");

	const onSubmit = (text: string) => {
		const tags = extract_tags(text);
		// How do i determine the id....kek
		addTask({
			id: Math.random() * 1000,
			isDone: false,
			tags,
			text,
			description: desc
		});
	};

	const [taskText, setTaskText] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setTaskText(e.target.value);
	};

	const onKeyDown = (
		e:
			| React.KeyboardEvent<HTMLInputElement>
			| React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		// console.log(e.key);
		if (e.key == "Escape") {
			inputElementRef.current?.blur();
		}
		if (e.shiftKey && e.key == "Enter") {
			e.preventDefault();

			setDescBoxState(s => {
				if (s) {
					inputElementRef.current?.focus();
				}
				return !s;
			});
		} else if (e.key == "Enter" && e.ctrlKey) {
			if (taskText.trim() == "") return;
			e.preventDefault();
			onSubmit(taskText);
			setTaskText("");
			setDesc("");
		}
	};

	return (
		<div className={css.form}>
			<div>
				<input
					type="text"
					autoFocus
					placeholder={PLACEHOLDER_TEXT}
					value={taskText}
					onChange={handleChange}
					onKeyDown={onKeyDown}
					ref={inputElementRef}
				/>
				{descBoxState && (
					<textarea
						name="description"
						value={desc}
						onChange={e => setDesc(e.target.value)}
						onKeyDown={onKeyDown}
						ref={textAreaRef}
						autoFocus
						placeholder={TEXTAREA_PLACEHOLDER}></textarea>
				)}
			</div>
			<StackAdder></StackAdder>
			{/* <Cursor offset={10}></Cursor> */}
		</div>
	);
};

// const Comments = () => {
// }

// shift + enter => go down a level
// enter = next line
// Mark it done on double click only

const StackAdder = () => {
	const addStack = useStacksState(s => s.addStack);
	return (
		<button onClick={() => addStack()} title="create a new stack !">
			Push !
		</button>
	);
};

// const Cursor: FC<{offset: number}> = ({offset}) => {
// 	return (
// 		<div data-offset={offset} className={css.cursor}>
// 			&#9608;
// 		</div>
// 	);
// };
