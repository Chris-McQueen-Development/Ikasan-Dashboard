import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IkasanModule from './ikasan-module';
import IkasanModuleDetail from './ikasan-module-detail';
import IkasanModuleUpdate from './ikasan-module-update';
import IkasanModuleDeleteDialog from './ikasan-module-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IkasanModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IkasanModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IkasanModuleDetail} />
      <ErrorBoundaryRoute path={match.url} component={IkasanModule} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IkasanModuleDeleteDialog} />
  </>
);

export default Routes;
