import { useSelector } from "react-redux";
import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
