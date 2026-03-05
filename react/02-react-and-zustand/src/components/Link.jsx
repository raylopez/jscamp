import { Link as NavLink } from "react-router";
import { useRouter } from "../hooks/useRouter";

export default function Link({ href, children, ...restOfProps }) {
  const { className = "" } = restOfProps;
  const { currentPage } = useRouter();
  const classNameFinal =
    currentPage === href ? `${className} active` : className;
  return (
    <NavLink to={href} {...restOfProps} className={classNameFinal}>
      {children}
    </NavLink>
  );
}
