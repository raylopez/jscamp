import { useNavigate, useLocation } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateTo(path) {
    navigate(path);
  }

  return {
    currentPage: location.pathname,
    navigateTo,
  };
}
