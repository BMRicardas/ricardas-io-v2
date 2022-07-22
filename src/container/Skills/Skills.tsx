/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { client, urlFor } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';

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
    <div className={classes.skills}>
      <h2>Skills & Experiences</h2>

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
            <motion.div className={classes.skillsExpItem} key={experience.year}>
              <div className={classes.skillsExpYear}>
                <p>{experience.year}</p>
              </div>
              <motion.div className={classes.skillsExpWorks}>
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className={classes.skillsExpWork}
                      data-tip={work.desc}
                      data-for={work.name}
                      key={work.name}
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
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Skills, classes.skills),
  'skills',
  'white-bg'
);
