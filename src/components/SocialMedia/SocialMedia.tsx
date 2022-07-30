import { FC } from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

import classes from './SocialMedia.module.scss';

export const SocialMedia: FC = () => {
  return (
    <div className={classes.socialMedia}>
      <a
        className={classes.link}
        href="https://www.linkedin.com/in/ricardas-brazdzius/"
        target="_blank"
        rel="noopener noreferrer"
        title="Linkedin profile"
      >
        <FaLinkedinIn />
      </a>
      <a
        className={classes.link}
        href="https://github.com/BMRicardas"
        target="_blank"
        rel="noopener noreferrer"
        title="Github profile"
      >
        <FaGithub />
      </a>
      <a
        className={classes.link}
        href="https://www.facebook.com/ricardas.brazdzius"
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook profile"
      >
        <FaFacebookF />
      </a>
    </div>
  );
};
