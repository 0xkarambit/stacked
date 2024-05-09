import css from "./header.module.css";

const HEADER_TEXT = `
  ██╗                 ███████╗ ████████╗  █████╗   ██████╗ ██╗  ██╗ ███████╗ ██████╗                  ██╗  
 ██╔╝                 ██╔════╝ ╚══██╔══╝ ██╔══██╗ ██╔════╝ ██║ ██╔╝ ██╔════╝ ██╔══██╗                 ╚██╗ 
██╔╝                  ███████╗    ██║    ███████║ ██║      █████╔╝  █████╗   ██║  ██║                  ╚██╗
╚██╗                  ╚════██║    ██║    ██╔══██║ ██║      ██╔═██╗  ██╔══╝   ██║  ██║                  ██╔╝
 ╚██╗███████╗███████╗ ███████║    ██║    ██║  ██║ ╚██████╗ ██║  ██╗ ███████╗ ██████╔╝ ███████╗███████╗██╔╝ 
  ╚═╝╚══════╝╚══════╝ ╚══════╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═════╝  ╚══════╝╚══════╝╚═╝  
`;

export const Header = () => {
	// writing stacked inside pre tag doesnt work, it gets broken into lines maybe we needed to add newlines
	// also it kept getting messed up when saving the file... autoformat

	return (
		<header className={css.header}>
			<LeftSide />
			<div>
				<pre className={css.main}>{HEADER_TEXT}</pre>
				<i>Tasks Management tool</i>
			</div>
			<RightSide />
		</header>
	);
};

const LeftSide = () => {
	return (
		<div className={css.left}>
			<b>Currently in WIP stage, come back soon 👋</b>
		</div>
	);
};

const RightSide = () => {
	return (
		<div className={css.right}>
			<a
				href="https://github.com/HarshitJoshi9152/stacked"
				target="_blank"
				rel="noopener noreferrer">
				view on github
			</a>
		</div>
	);
};
