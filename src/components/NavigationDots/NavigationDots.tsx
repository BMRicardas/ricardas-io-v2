import { FC, useContext } from 'react';

import { VisibleContext } from '../../context/visible-context';

import classes from './NavigationDots.module.scss';

export const NavigationDots: FC = () => {
  const { visible } = useContext(VisibleContext);

  console.log(visible);

  return (
    <div className={classes.navigation}>
      {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map(
        (item, i) => (
          <a
            href={`#${item}`}
            key={item + i}
            className={classes.navigationDot}
            style={visible === item ? { backgroundColor: '#313BAC' } : {}}
            title={item.toUpperCase()}
          >
            <span aria-hidden="true" />
          </a>
        )
      )}
    </div>
  );
};
