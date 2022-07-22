import { FC } from 'react';

import { NavigationDots, SocialMedia } from '../../components';

import classes from './AppWrap.module.scss';

const currentYear = new Date().getFullYear();

export const AppWrap = (
  Component: FC,
  idName: string,
  classNames: string = ''
) =>
  function HOC() {
    return (
      <div id={idName} className={`${classes.container} ${classNames}`}>
        <SocialMedia />
        <div className={classes.wrapper}>
          <Component />

          <div className={classes.copyright}>
            <p className={classes.pText}>@{currentYear} Ričardas</p>
            <p className={classes.pText}>All rights reserved.</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };
