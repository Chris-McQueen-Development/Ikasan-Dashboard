import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IntegratedSystem from './integrated-system';
import IntegratedSystemDetail from './integrated-system-detail';
import IntegratedSystemUpdate from './integrated-system-update';
import IntegratedSystemDeleteDialog from './integrated-system-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IntegratedSystemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IntegratedSystemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IntegratedSystemDetail} />
      <ErrorBoundaryRoute path={match.url} component={IntegratedSystem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IntegratedSystemDeleteDialog} />
  </>
);

export default Routes;
