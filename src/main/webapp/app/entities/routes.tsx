import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Company from './company';
import Department from './department';
import Team from './team';
import Country from './country';
import Person from './person';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
        <ErrorBoundaryRoute path={`${match.url}department`} component={Department} />
        <ErrorBoundaryRoute path={`${match.url}team`} component={Team} />
        <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
        <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
