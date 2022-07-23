import { FC } from 'react';

import classes from './Logo.module.scss';

interface Props {
  shrunk: boolean;
}

export const Logo: FC<Props> = ({ shrunk }) => {
  const logoActive = shrunk;
  const logoClass = [classes.logo, logoActive ? classes.active : ''];

  return (
    <div className={logoClass.join(' ')}>
      <div className={classes.image}>
        <span className={classes.less}>&lt;</span>
        <span className={classes.slash}>&frasl;</span>
        <span className={classes.more}>&gt;</span>
      </div>
      <div className={classes.title}>ricardas.io</div>
    </div>
  );
};
