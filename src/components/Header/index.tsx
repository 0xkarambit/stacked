import css from "./header.module.css";

const HEADER_TEXT = `
  ██╗                 ███████╗ ████████╗  █████╗   ██████╗ ██╗  ██╗ ███████╗ ██████╗                  ██╗  
 ██╔╝                 ██╔════╝ ╚══██╔══╝ ██╔══██╗ ██╔════╝ ██║ ██╔╝ ██╔════╝ ██╔══██╗                 ╚██╗ 
██╔╝                  ███████╗    ██║    ███████║ ██║      █████╔╝  █████╗   ██║  ██║                  ╚██╗
╚██╗                  ╚════██║    ██║    ██╔══██║ ██║      ██╔═██╗  ██╔══╝   ██║  ██║                  ██╔╝
 ╚██╗███████╗███████╗ ███████║    ██║    ██║  ██║ ╚██████╗ ██║  ██╗ ███████╗ ██████╔╝ ███████╗███████╗██╔╝ 
  ╚═╝╚══════╝╚══════╝ ╚══════╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═════╝  ╚══════╝╚══════╝╚═╝  
`;

function Header() {
	// writing stacked inside pre tag doesnt work, it gets broken into lines maybe we needed to add newlines
	// also it kept getting messed up when saving the file... autoformat

	return (
		<header className={css.header}>
			<pre>{HEADER_TEXT}</pre>
		</header>
	);
}

export default Header;
