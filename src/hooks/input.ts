import {useState} from "react";

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") {
			onSubmit(value);
			e.preventDefault();

			// changing value after submit
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
