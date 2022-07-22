import { FC } from 'react';

import { NavigationDots, SocialMedia } from '../../components';

import classes from './AppWrap.module.scss';

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
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };
