import {create} from "zustand";
import {produce} from "immer";

export interface TaskI {
	id: number;
	text: string;
	description: string;
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
	toggleTaskCompletion: (stackIdx: number, taskIdx: number) => void;
	changeCurrentStackIdx: (stackIdx: number) => void;
	addStack: () => void;
};

export const useStacksState = create<StacksStateI & StackMethodsI>()(set => ({
	currentStackIdx: 0,
	stacks: [
		{
			name: "Stack 0",
			isDone: false,
			tasks: [
				{
					id: 0,
					text: "Task 1",
					tags: [],
					isDone: false,
					description: ""
				},
				{
					id: 1,
					text: "task 2",
					tags: [],
					isDone: false,
					description: ""
				}
			]
		},
		{
			name: "Stack 1",
			isDone: false,
			tasks: [
				{
					id: 0,
					text: "Review PR",
					tags: [],
					isDone: false,
					description: ""
				}
			]
		},
		{
			name: "Stack 3 less go",
			isDone: false,
			tasks: [
				{
					id: 0,
					text: "Read immerjs source code",
					tags: [],
					isDone: false,
					description: ""
				},
				{
					id: 1,
					text: "Damn proxy tree",
					tags: [],
					isDone: false,
					description: ""
				}
			]
		}
	],

	// Methods to operate on the state
	addTask: (task: TaskI) =>
		set(state =>
			produce(state, draft => {
				draft.stacks[draft.currentStackIdx].tasks.push(task);
			})
		),

	toggleTaskCompletion: (stackIdx, taskIdx) =>
		set(s => {
			const done = s.stacks[stackIdx].tasks[taskIdx].isDone;
			return produce(s, draft => {
				draft.stacks[stackIdx].tasks[taskIdx].isDone = !done;
			});
		}),

	changeCurrentStackIdx: stackIdx => set({currentStackIdx: stackIdx}),
	addStack: () =>
		set(s => ({
			stacks: [
				...s.stacks,
				{name: `Stack ${s.stacks.length}`, isDone: false, tasks: []}
			],
			currentStackIdx: s.stacks.length
		}))
}));
