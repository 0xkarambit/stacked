export interface TaskI {
	id: number;
	text: string;
	tags: string[];
	isDone: boolean;
}

export interface StackI {
	name: string;
	tasks: TaskI[];
	isDone: boolean;
}

export type StacksStateI = {
	currentStackIdx: number;
	stacks: StackI[];
};

export type StackMethodsI = {
	addTask: (task: TaskI) => void;
	markTaskDone: (stackIdx: number, taskIdx: number) => void;
	changeCurrentStackIdx: (stackIdx: number) => void;
	addStack: (name: string) => void;
};

export type TaskAction =
	| {type: "Add"; task: TaskI}
	| {type: "Done"; taskIdx: number; stackIdx: number};

export type StackReducer = (a: StacksStateI, b: TaskAction) => StacksStateI;
