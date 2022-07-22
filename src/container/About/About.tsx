import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { client, urlFor } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';

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

const About = () => {
  const [abouts, setAbouts] = useState<AboutItem[] | []>([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <div className={classes.about}>
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
            <img src={`${urlFor(about.imgUrl)}`} alt={about.title} />
            <h2 style={{ marginTop: '2rem' }}>{about.title}</h2>
            <p style={{ marginTop: '1rem' }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(About, classes.about), 'about', 'white-bg');
