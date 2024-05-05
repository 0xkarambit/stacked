import {ReactNode} from "react";
import styles from "./container.module.css";

interface ContainerProps {
	children: ReactNode;
}

// this is a very smol component, I think i should have have used the CSS here inline
export default function Container({children}: ContainerProps) {
	return <div className={styles.layoutContainer}>{children}</div>;
}
