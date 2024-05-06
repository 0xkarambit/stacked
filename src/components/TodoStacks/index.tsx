const stack = [1, 2, 3, 4, 5].map(n => `task ${n}`);

const TodoStacks = () => {
	const stackView = stack.map(s => <li>{s}</li>);
	return <div>{stackView}</div>;
};

TodoStacks.propTypes = {};

export default TodoStacks;
