import { FC } from 'react';

import classes from './NavigationDots.module.scss';

interface Props {
  active: any;
}

export const NavigationDots: FC<Props> = ({ active }) => {
  return (
    <div className={classes.navigation}>
      {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map(
        (item, i) => (
          <a
            href={`#${item}`}
            key={item + i}
            className={classes.navigationDot}
            style={active === item ? { backgroundColor: '#313BAC' } : {}}
            aria-label={item}
          >
            <span aria-hidden="true" />
          </a>
        )
      )}
    </div>
  );
};
