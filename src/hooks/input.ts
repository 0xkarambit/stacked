import {useState} from "react";
import {useStackState} from "../stores/stacks";

type useInputReturn = [
	string,
	React.Dispatch<React.SetStateAction<string>>,
	(e: React.ChangeEvent<HTMLInputElement>) => void,
	(e: React.KeyboardEvent<HTMLInputElement>) => void
];

export enum submitBehaviour {
	CLEAR,
	DEFAULT
}

export function useSingleInput(
	defaultValue: string,
	onSubmit: (value: string) => void,
	// todo: this should be a config object :hmmm
	clearAfterSubmit?: submitBehaviour
): useInputReturn {
	const [value, setValue] = useState(defaultValue);
	const addStack = useStackState(s => s.addStack);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (value.trim() == "") return;
		// TODO: fix not working
		if (e.ctrlKey && e.key == "n") {
			e.preventDefault();
			addStack("Name ehjdjas");
			return;
		}
		if (e.key == "Enter") {
			e.preventDefault();
			onSubmit(value);

			switch (clearAfterSubmit) {
				case submitBehaviour.CLEAR:
					setValue("");
					break;
				case submitBehaviour.DEFAULT:
					setValue(defaultValue);
					break;
				default:
					break;
			}
		}
	};

	return [value, setValue, handleChange, submitOnEnter];
}
