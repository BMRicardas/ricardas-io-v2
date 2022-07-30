import { FC, useContext, useEffect, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import { useIntersectionObserver } from '../../tools/hooks/use-intersection-observer';
import { VisibleContext } from '../../context/visible-context';
import { useVisibilityId } from '../../tools/hooks';

import classes from './Testimonial.module.scss';

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

const Testimonial: FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(testimonialsRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';

    client.fetch<TestimonialItem[]>(query).then((data) => {
      setTestimonials(data);
    });
  }, []);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  const testimonial = testimonials[currentIndex];

  if (!testimonial) return null;

  return (
    <section
      ref={testimonialsRef}
      id="testimonials"
      className={classes.testimonial}
    >
      {testimonials.length && (
        <>
          <div className={classes.testimonialItem}>
            <img src={urlFor(testimonial.imgurl)} alt="testimonial" />
            <div className={classes.testimonialContent}>
              <p>{testimonial.feedback}</p>
              <div>
                <h4>{testimonial.name}</h4>
                <h5>{testimonial.company}</h5>
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
    </section>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, classes.testimonial),
  'testimonials',
  'primary-bg'
);
