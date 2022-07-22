import classes from './Footer.module.scss';

export const Footer = () => {
  const year = new Date();
  const currentYear = year.getFullYear();

  return (
    <div className={classes.footer}>
      <p>
        © {currentYear}{' '}
        <a href="https://ricardas.io" className={classes.link}>
          Ricardas.io
        </a>
        <br />
        All Rights Reserved
      </p>
    </div>
  );
};
