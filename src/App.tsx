import {
  About,
  Contacts,
  Header,
  Skills,
  Testimonial,
  Work,
} from './container';
import { Footer, Navbar, NavigationDots, SocialMedia } from './components';
import classes from './App.module.scss';

export const App = () => {
  return (
    <div className={classes.app}>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Contacts />
      <Footer />
      <SocialMedia />
      <NavigationDots />
    </div>
  );
};
