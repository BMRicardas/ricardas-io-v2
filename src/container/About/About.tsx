import { motion } from 'framer-motion';
import { FC, useContext, useEffect, useRef, useState } from 'react';

import { client, urlFor } from '../../client';
import { VisibleContext } from '../../context/visible-context';
import { useVisibilityId } from '../../tools/hooks';
import { useIntersectionObserver } from '../../tools/hooks/use-intersection-observer';
import { MotionWrap } from '../../wrapper';

import classes from './About.module.scss';

interface AboutItem {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  description: string;
  imgUrl: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  title: string;
}

const About: FC = () => {
  const [abouts, setAbouts] = useState<AboutItem[]>([]);

  const aboutRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(aboutRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <section ref={aboutRef} id="about" className={classes.about}>
      <div className={classes.wrapper}>
        <h2>
          I Know That <span>Good Development</span>
          <br />
          means <span>Good Business</span>
        </h2>
        <div className={classes.profiles}>
          {abouts.map((about, i) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className={classes.profileItem}
              key={about.title + i}
            >
              <img src={urlFor(about.imgUrl)} alt={about.title} />
              <h2>{about.title}</h2>
              <p>{about.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotionWrap(About, classes.about);
