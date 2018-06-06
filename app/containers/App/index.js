import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import PostsPage from 'containers/PostsPage';
import PostPage from 'containers/PostPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={PostsPage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}
