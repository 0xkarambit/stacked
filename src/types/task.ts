export interface Task {
	id: number;
	text: string;
	tags: string[];
	isDone: boolean;
}

export type TaskAction = {type: "Add"; task: Task} | {type: "Done"; task: Task};
export type TaskReducer = (a: Task[], b: TaskAction) => Task[];
