import {create} from "zustand";
import {StackMethodsI, StacksStateI, TaskI} from "../types/task";
import {produce} from "immer";

export const useStackState = create<StacksStateI & StackMethodsI>()(set => ({
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
					isDone: false
				},
				{
					id: 1,
					text: "task 2",
					tags: [],
					isDone: false
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
					isDone: false
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
					isDone: false
				},
				{
					id: 1,
					text: "Damn proxy tree",
					tags: [],
					isDone: false
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

	markTaskDone: (stackIdx, taskIdx) =>
		set(s =>
			produce(s, draft => {
				draft.stacks[stackIdx].tasks[taskIdx].isDone = true;
			})
		),

	changeCurrentStackIdx: stackIdx => set({currentStackIdx: stackIdx}),
	addStack: name =>
		set(s => ({
			stacks: [...s.stacks, {name, isDone: false, tasks: []}],
			currentStackIdx: s.stacks.length
		}))
}));
