import { FC, useContext, useRef } from 'react';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import { VisibleContext } from '../../context/visible-context';
import { useIntersectionObserver } from '../../tools/hooks/use-intersection-observer';
import { AppWrap } from '../../wrapper';
import { useVisibilityId } from '../../tools/hooks';

import classes from './Header.module.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header: FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(homeRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

  return (
    <div ref={homeRef} id="home" className={classes.header}>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className={classes.info}
      >
        <div className={classes.badge}>
          <div className={classes.cmp}>
            <span>👋</span>
            <div>
              <p>Hello, I am</p>
              <h1>Ričardas</h1>
            </div>
          </div>

          <div className={classes.tagCmp}>
            <p>Web Developer</p>
            <p>Looking where to apply my skills</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={classes.img}
      >
        <img src={images.profile2} alt="profile background" />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className={classes.circles}
      >
        {[images.typescript, images.react, images.sass].map((circle, i) => (
          <div className={classes.circleCmp} key={`circle-${i}`}>
            <img src={circle} alt="" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
