import { NavLink } from "react-router";

export default function Link({
  href,
  children,
  activeClass = "active",
  additionalClass = "",
  ...restOfProps
}) {
  return (
    <NavLink
      to={href}
      {...restOfProps}
      className={({ isActive }) =>
        `${additionalClass}  ${isActive ? activeClass : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
