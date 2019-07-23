import React from 'react';
import { BasePage } from 'aurae-pages';
import PlayerSelect from './components/pages/BasePage/PlayerSelect';
import clone from 'clone';
import { HashRouter, Route, Switch } from 'react-router-dom';

export const AppRoutes = ({ routes }) => (
  <HashRouter>
    <Switch>
      <Route component={PlayerSelect} path="/player" exact={true} />
      <Route component={BasePage} path="/" exact={false} />
    </Switch>
  </HashRouter>
);
