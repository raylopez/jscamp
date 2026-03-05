import useRouter from "../hooks/useRouter";

export default function Link({ href, children, ...restOfProps }) {
  const { currentPage, navigateTo } = useRouter();
  const linkClass = currentPage === href ? "active" : "";

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href} {...restOfProps} onClick={handleClick} className={linkClass}>
      {children}
    </a>
  );
}
