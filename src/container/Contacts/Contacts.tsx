import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useRef,
  useState,
} from 'react';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { client } from '../../client';
import { VisibleContext } from '../../context/visible-context';
import { useVisibilityId } from '../../tools/hooks';
import { useIntersectionObserver } from '../../tools/hooks/use-intersection-observer';
import { MotionWrap } from '../../wrapper';

import classes from './Contacts.module.scss';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Footer: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contactsRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(contactsRef, { threshold: 0.5 });
  const visibleCtx = useContext(VisibleContext);

  useVisibilityId(entry, visibleCtx?.visibleHandler);

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
          Take <span>a coffee</span> & <span>chat</span> with me
        </h2>
        <div className={classes.cards}>
          <a
            href="mailto:ricardas.brazdzius@gmail.com"
            className={classes.card}
          >
            <MdEmail className={classes.img} />
            ricardas.brazdzius@gmail.com
          </a>
          <a href="tel:+370 699 83405" className={classes.card}>
            <FaPhoneSquareAlt className={classes.img} />
            +370 699 83405
          </a>
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
                required
              />
            </div>
            <div className={classes.formItem}>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={classes.formItem}>
              <textarea
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleInputChange}
                maxLength={280}
                rows={4}
                required
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
