import { FC, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';

import { client, urlFor } from '../../client';
import { VisibleContext } from '../../context/visible-context';
import { useVisibilityId } from '../../tools/hooks';
import { useIntersectionObserver } from '../../tools/hooks/use-intersection-observer';
import { AppWrap, MotionWrap } from '../../wrapper';

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

const Work: FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState<{
    y: number;
    opacity: number;
  }>({ y: 0, opacity: 1 });
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filterWork, setFilterWork] = useState<WorkItem[]>([]);

  const workRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(workRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

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
        {['TypeScript', 'Axios', 'React', 'All'].map((item, i) => (
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
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={classes.workPortfolio}
      >
        {filterWork.map((work, i) => (
          <div className={classes.workItem} key={i}>
            <div className={classes.workImg}>
              <img src={urlFor(work.imgUrl)} alt={work.title} />
              <div className={classes.workHover}>
                <div>
                  <a
                    href={work.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.workHoverLink}
                  >
                    <CgWebsite />
                  </a>
                </div>

                <div>
                  <a
                    href={work.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.workHoverLink}
                  >
                    <AiFillGithub />
                  </a>
                </div>
              </div>
            </div>

            <div className={classes.workContent}>
              <h4>{work.title}</h4>
              <p>{work.description}</p>

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
