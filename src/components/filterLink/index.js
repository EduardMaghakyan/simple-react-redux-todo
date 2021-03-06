import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';


const FilterLink = ({ filter, children }) => (
  <NavLink
    to={`/${filter}`}
    className="button"
    activeClassName="active"
    isActive={(match, location) => {
      if (!match && location.pathname === '/' && children === 'All') {
        return true;
      }

      return match;
    }}
  >
    {children}
  </NavLink>
);

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FilterLink;
