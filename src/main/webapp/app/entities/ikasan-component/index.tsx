import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IkasanComponent from './ikasan-component';
import IkasanComponentDetail from './ikasan-component-detail';
import IkasanComponentUpdate from './ikasan-component-update';
import IkasanComponentDeleteDialog from './ikasan-component-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IkasanComponentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IkasanComponentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IkasanComponentDetail} />
      <ErrorBoundaryRoute path={match.url} component={IkasanComponent} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IkasanComponentDeleteDialog} />
  </>
);

export default Routes;
