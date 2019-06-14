import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const Visualisation = props => (
  <NavItem>
    <NavLink tag={Link} to="/visualisation" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Visualisation</span>
    </NavLink>
  </NavItem>
);
