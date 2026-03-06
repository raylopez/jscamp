import { NavLink } from 'react-router'

export default function Link({ href, children, activeClass = 'active', ...restOfProps }) {
  return (
    <NavLink to={href} {...restOfProps} className={ ({ isActive }) => isActive ? activeClass : '' }>
      {children}
    </NavLink>
  );
}
