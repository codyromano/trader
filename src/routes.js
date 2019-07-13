import React from 'react';
import { BasePage } from 'aurae-pages';
import clone from 'clone';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from 'aurae-config/routes';

export const routerRedirector = (history) => ({
  placeTileResource() {
    history.push(routes.pages.placeResource.path);
  },
  manageResource(resource) {
    const path = routes.pages.plant.path.replace(
      ':resourceId',
      resource.id
    );
    history.push(path);
  }
});

export const AppRoutes = ({ routes }) => (
  <HashRouter>
    <Switch>
      {routes.order.map(routeId => {
        const route = clone(routes.pages[routeId]);
        // Wrap each route in a component that provides a route Id. This lets
        // components such as the TabsMenu identify the active route.
        const WrappedComponent = (props) => {
          return <BasePage {...props} routeId={routeId} />;
        };
        route.component = WrappedComponent;
        return <Route key={routeId} {...route} />;
      })}
    </Switch>
  </HashRouter>
);
