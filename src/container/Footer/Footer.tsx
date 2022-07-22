/* eslint-disable no-unused-vars */
import { ChangeEvent, FormEvent, useState } from 'react';

import { client } from '../../client';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';

import classes from './Footer.module.scss';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className={classes.footer}>
      <h2>
        Take <span>a coffee</span> & chat <span>with me</span>
      </h2>
      <div className={classes.footerCards}>
        <div className={classes.footerCard}>
          <img src={images.email} alt="email" />
          <a
            href="mailto:ricardas.brazdzius@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ricardas.brazdzius@gmail.com
          </a>
        </div>
        <div className={classes.footerCard}>
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
        <div className={classes.footerForm}>
          <h3>Thank you for getting in touch</h3>
        </div>
      ) : (
        <form className={classes.footerForm} onSubmit={handleSubmit}>
          <div className={classes.footerFormItem}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.footerFormItem}>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.footerFormItem}>
            <textarea
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(Footer, classes.footer),
  'contact',
  'white-bg'
);
