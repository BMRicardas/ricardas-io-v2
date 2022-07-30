import { FC, useContext } from 'react';

import { VisibleContext } from '../../context/visible-context';
import { capitalizeFirstLetter } from '../../tools/common/capitalize-first-letter';

import classes from './NavigationDots.module.scss';

export const NavigationDots: FC = () => {
  const visibleCtx = useContext(VisibleContext);

  return (
    <div className={classes.navigation}>
      {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map(
        (item, i) => (
          <a
            href={`#${item}`}
            key={item + i}
            className={classes.navigationDot}
            style={
              visibleCtx?.visibleSection === item
                ? { backgroundColor: '#313BAC' }
                : {}
            }
            title={capitalizeFirstLetter(item)}
          >
            <span aria-hidden="true" />
          </a>
        )
      )}
    </div>
  );
};
