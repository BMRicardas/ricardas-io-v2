import { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';

import classes from './Navbar.module.scss';

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <img src={images.logo} alt="logo" />
      </div>
      <ul className={classes.links}>
        {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
          <li key={`link-${item}`}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className={classes.navbarMenu}>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={() => setToggle(false)}
                    onKeyDown={() => setToggle(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};