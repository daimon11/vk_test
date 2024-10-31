import React from 'react';
import style from './Main.module.css';
import Layout from './Layout';
import Tabs from './Tabs';
import List from './List';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Layout/Home/Home';
import { NotFound } from './Layout/NotFound/NotFound';

export const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:page' element={<List />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </main>
  );
};