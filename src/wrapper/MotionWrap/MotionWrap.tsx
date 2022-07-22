import { FC } from 'react';
import { motion } from 'framer-motion';

import classes from './MotionWrap.module.scss';

export const MotionWrap = (Component: FC, classNames: string = '') =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={`${classes.container} ${classNames}`}
      >
        <Component />
      </motion.div>
    );
  };
