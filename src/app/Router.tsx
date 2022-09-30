import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
//import { List, Lists, Login, NotFound } from '../pages';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}></Route>
        {/* <Route path="login" element={<Login />} />
          <Route path="lists" element={<Lists />}>
            <Route path=":listId" element={<List />} />
            <Route path="new" element={<List />} />
          </Route> */}
        {/* </Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Router;
