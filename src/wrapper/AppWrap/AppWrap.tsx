import { FC } from 'react';

import classes from './AppWrap.module.scss';

export const AppWrap = (
  Component: FC,
  idName: string,
  classNames: string = ''
) =>
  function HOC() {
    return (
      <div id={idName} className={`${classes.container} ${classNames}`}>
        <div className={classes.wrapper}>
          <Component />
        </div>
      </div>
    );
  };
