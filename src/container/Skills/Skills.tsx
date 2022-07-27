/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { client, urlFor } from '../../client';
import { VisibleContext } from '../../context/visible-context';
import { useVisibilityId } from '../../hooks';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { MotionWrap } from '../../wrapper';

import classes from './Skills.module.scss';

interface Work {
  _key: string;
  _type: string;
  company: string;
  desc: string;
  name: string;
}

interface Experience {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  works: Work[];
  year: string;
}

interface Skill {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  bgColor: string;
  icon: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  name: string;
}

const Skills = () => {
  const [tooltip, showTooltip] = useState(true);
  const [experiences, setExperiences] = useState<Experience[] | []>([]);
  const [skills, setSkills] = useState<Skill[] | []>([]);

  const skillsRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(skillsRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <section ref={skillsRef} id="skills" className={classes.skills}>
      <h2>Skills & Experiences</h2>
      <div className={classes.wrapper}>
        <div className={classes.skillsContainer}>
          <motion.div className={classes.skillsList}>
            {skills.map((skill) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className={classes.skillsItem}
                key={skill.name}
              >
                <div style={{ backgroundColor: skill.bgColor }}>
                  <img src={`${urlFor(skill.icon)}`} alt={skill.name} />
                </div>
                <p>{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className={classes.skillsExp}>
            {experiences.map((experience) => (
              <motion.div
                className={classes.skillsExpItem}
                key={experience.year}
              >
                <div className={classes.skillsExpYear}>
                  <p>{experience.year}</p>
                </div>
                <motion.div className={classes.skillsExpWorks}>
                  {experience.works.map((work) => (
                    <Fragment key={work.name}>
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className={classes.skillsExpWork}
                        data-tip={work.desc}
                        data-for={work.name}
                        onMouseEnter={() => showTooltip(true)}
                        onMouseLeave={() => {
                          showTooltip(false);
                          setTimeout(() => showTooltip(true), 50);
                        }}
                      >
                        <h4>{work.name}</h4>
                        <p>{work.company}</p>
                      </motion.div>
                      {tooltip && (
                        <ReactTooltip
                          id={work.name}
                          effect="solid"
                          arrowColor="#fff"
                          className={classes.skillsTooltip}
                        />
                      )}
                    </Fragment>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MotionWrap(Skills, classes.skills);
