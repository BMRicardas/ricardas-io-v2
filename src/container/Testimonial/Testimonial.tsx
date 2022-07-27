/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { VisibleContext } from '../../context/visible-context';
import { useVisibilityId } from '../../hooks';

import classes from './Testimonial.module.scss';

interface Brand {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  imgUrl: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  name: string;
}

interface TestimonialItem {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  company: string;
  feedback: string;
  imgurl: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  name: string;
}

const Testimonial = () => {
  const [brands, setBrands] = useState<Brand[] | []>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[] | []>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(testimonialsRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  const testi = testimonials[currentIndex];

  return (
    <section
      ref={testimonialsRef}
      id="testimonials"
      className={classes.testimonial}
    >
      {testimonials.length && (
        <>
          <div className={classes.testimonialItem}>
            <img src={`${urlFor(testi.imgurl)}`} alt="testimonial" />
            <div className={classes.testimonialContent}>
              <p>{testi.feedback}</p>
              <div>
                <h4>{testi.name}</h4>
                <h5>{testi.company}</h5>
              </div>
            </div>
          </div>
          <div className={classes.testimonialBtns}>
            <button
              className={classes.testimonialBtn}
              type="button"
              onClick={() => {
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                );
              }}
            >
              <HiChevronLeft />
            </button>
            <button
              className={classes.testimonialBtn}
              type="button"
              onClick={() => {
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                );
              }}
            >
              <HiChevronRight />
            </button>
          </div>
        </>
      )}
      <div className={classes.testimonialBrands}>
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={`${urlFor(brand.imgUrl)}`} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, classes.testimonial),
  'testimonials',
  'primary-bg'
);
