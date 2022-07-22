import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

import classes from './SocialMedia.module.scss';

export const SocialMedia = () => {
  return (
    <div className={classes.socialMedia}>
      <div>
        <BsTwitter />
      </div>
      <div>
        <FaFacebookF />
      </div>
      <div>
        <BsInstagram />
      </div>
    </div>
  );
};
