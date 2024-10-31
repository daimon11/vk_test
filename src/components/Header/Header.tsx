import style from './Header.module.css';

import Layout from '../Main/Layout';
import Logo from './Logo';
import Heading from './Heading';


export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.gridContainer}>
        <Logo />
        <Heading text='Главная' />
      </div>
    </Layout>
  </header>
);

