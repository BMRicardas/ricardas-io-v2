import { motion } from 'framer-motion';

import { images } from '../../constants';
import { AppWrap } from '../../wrapper';

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

const Header = () => {
  return (
    <div className={classes.header}>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className={classes.info}
      >
        <div className={classes.badge}>
          <div className={classes.cmp}>
            <span>👋</span>
            <div style={{ marginLeft: '2rem' }}>
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
        <img src={images.profile} alt="profile background" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt=""
          className={classes.overlayCircle}
        />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className={classes.circles}
      >
        {[images.flutter, images.redux, images.sass].map((circle, i) => (
          <div className={classes.circleCmp} key={`circle-${i}`}>
            <img src={circle} alt="" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
