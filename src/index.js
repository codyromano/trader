import React from 'react';
import { AppRoutes } from './routes';
import { render } from 'react-dom';
import routes from 'aurae-config/routes.json';

render(<AppRoutes routes={routes} />, document.getElementById('root'));
