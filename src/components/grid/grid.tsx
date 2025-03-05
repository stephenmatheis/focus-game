import { Cell } from '../cell';
import styles from './grid.module.scss';

export function Grid() {
    return (
        <div className={styles.grid}>
            {Array.from({ length: 100 }, (_, index) => (
                <Cell key={index} name={index + 1} />
            ))}
        </div>
    );
}
