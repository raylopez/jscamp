import React from "react";
import useRouter from "../hooks/useRouter";

export default function Router({ route, component: Component }) {
  const { currentPage } = useRouter();
  if (route !== currentPage) return null;

  return <Component />;
}
