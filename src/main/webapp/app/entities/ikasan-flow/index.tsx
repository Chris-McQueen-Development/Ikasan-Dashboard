import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IkasanFlow from './ikasan-flow';
import IkasanFlowDetail from './ikasan-flow-detail';
import IkasanFlowUpdate from './ikasan-flow-update';
import IkasanFlowDeleteDialog from './ikasan-flow-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IkasanFlowUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IkasanFlowUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IkasanFlowDetail} />
      <ErrorBoundaryRoute path={match.url} component={IkasanFlow} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IkasanFlowDeleteDialog} />
  </>
);

export default Routes;
