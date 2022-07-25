import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';

import { client, urlFor } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { VisibleContext } from '../../context/visible-context';

import classes from './Work.module.scss';

interface WorkItem {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  codeLink: string;
  description: string;
  imgUrl: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  projectLink: string;
  tags: string[];
  title: string;
}

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState<WorkItem[] | []>([]);
  const [filterWork, setFilterWork] = useState<WorkItem[] | []>([]);

  const workRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(workRef, { threshold: 0.5 });
  const { visibleHandler } = useContext(VisibleContext);

  if (entry?.isIntersecting) {
    visibleHandler(entry?.target.id);
  }

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <section ref={workRef} id="work" className={classes.works}>
      <h2>
        My Creative <span>Portfolio</span>
        <br />
        Section
      </h2>
      <div className={classes.workFilter}>
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map(
          (item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleWorkFilter(item)}
              className={`${classes.workFilterItem} ${
                activeFilter === item ? classes.itemActive : ''
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={classes.workPortfolio}
      >
        {filterWork.map((work, i) => (
          <div className={classes.workItem} key={i}>
            <div className={classes.workImg}>
              <img src={`${urlFor(work.imgUrl)}`} alt={work.title} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: 'easeInOut',
                  staggerChildren: 0.5,
                }}
                className={classes.workHover}
              >
                <a
                  href={work.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className={classes.workHoverLink}
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a
                  href={work.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className={classes.workHoverLink}
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className={classes.workContent}>
              <h4>{work.title}</h4>
              <p style={{ marginTop: '1rem' }}>{work.description}</p>

              <div className={classes.workTag}>
                <p>{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default AppWrap(MotionWrap(Work, classes.works), 'work', 'primary-bg');
