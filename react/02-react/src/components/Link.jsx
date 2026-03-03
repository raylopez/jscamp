import useRouter from "../hooks/useRouter";

export default function Link({ href, children, ...restOfProps }) {
  const { currentPage } = useRouter();
  const linkClass = currentPage === href ? "active" : "";

  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={href} {...restOfProps} onClick={handleClick} className={linkClass}>
      {children}
    </a>
  );
}
