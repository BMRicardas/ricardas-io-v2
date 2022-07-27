/* eslint-disable no-unused-vars */
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';

import { client } from '../../client';
import { images } from '../../constants';
import { VisibleContext } from '../../context/visible-context';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { MotionWrap } from '../../wrapper';

import classes from './Contacts.module.scss';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contactsRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(contactsRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  if (entry?.isIntersecting) {
    visibleCtx?.visibleHandler(entry?.target.id);
  }

  const { name, email, message } = formData;

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const contact = {
      _type: 'contact',
      name,
      email,
      message,
    };

    client.create(contact).then(() => {
      setIsLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <section ref={contactsRef} id="contact" className={classes.contacts}>
      <div className={classes.wrapper}>
        <h2>
          Take <span>a coffee</span> & chat <span>with me</span>
        </h2>
        <div className={classes.cards}>
          <div className={classes.card}>
            <img src={images.email} alt="email" />
            <a
              href="mailto:ricardas.brazdzius@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ricardas.brazdzius@gmail.com
            </a>
          </div>
          <div className={classes.card}>
            <img src={images.mobile} alt="mobile" />
            <a
              href="tel:+370 699 83405"
              target="_blank"
              rel="noopener noreferrer"
            >
              +370 699 83405
            </a>
          </div>
        </div>

        {isFormSubmitted ? (
          <div className={classes.form}>
            <h3>Thank you for getting in touch</h3>
          </div>
        ) : (
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.formItem}>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes.formItem}>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes.formItem}>
              <textarea
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleInputChange}
              />
            </div>
            <button
              className={classes.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default MotionWrap(Footer, classes.contacts);
