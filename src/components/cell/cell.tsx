import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './cell.module.scss';
import classNames from 'classnames';

type CellProps = {
    name: string | number;
};

const STARTING_HIT_POINTS = 5;

export function Cell({ name }: CellProps) {
    const [hitPoints, setHitPoints] = useState<number>(STARTING_HIT_POINTS);
    const [timer, setTimer] = useState<number | null>(null);

    function handlePressed(type: string) {
        console.log(type);

        if (!timer) return;

        const elapsed = performance.now() - timer;

        console.log('Pressed for:', elapsed, ' ms');

        const damage = Math.floor(elapsed / 1000);
        const newHitPoints = hitPoints - damage;

        console.log('Damage:', damage);
        console.log('HP:', newHitPoints);

        setHitPoints(newHitPoints > 0 ? newHitPoints : 0);

        setTimer(null);
    }

    return (
        <motion.div
            className={classNames(styles.cell, { [styles.pressed]: timer })}
            onMouseDown={() => {
                console.log('Mouse Down');
                setTimer(performance.now());
            }}
            onMouseUp={timer ? () => handlePressed('Mouse Up') : undefined}
            onMouseLeave={timer ? () => handlePressed('Mouse Leave') : undefined}
            initial={{ scale: 1 }}
            variants={{
                normal: { scale: 1, transition: { duration: 0.1 } },
                pressed: { scale: 0, transition: { duration: STARTING_HIT_POINTS } },
            }}
            animate={timer ? 'pressed' : 'normal'}
        >
            <div className={styles.name}>{name}</div>
            <div className={styles.hitPoints}>HP {hitPoints}</div>
        </motion.div>
    );
}
