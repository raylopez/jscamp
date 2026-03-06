import { useNavigate, useLocation } from 'react-router'

export default function useRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return { currentPath: location.pathname, navigateTo };
}
