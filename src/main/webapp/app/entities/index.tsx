import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IntegratedSystem from './integrated-system';
import IkasanModule from './ikasan-module';
import IkasanFlow from './ikasan-flow';
import IkasanComponent from './ikasan-component';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/integrated-system`} component={IntegratedSystem} />
      <ErrorBoundaryRoute path={`${match.url}/ikasan-module`} component={IkasanModule} />
      <ErrorBoundaryRoute path={`${match.url}/ikasan-flow`} component={IkasanFlow} />
      <ErrorBoundaryRoute path={`${match.url}/ikasan-component`} component={IkasanComponent} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
