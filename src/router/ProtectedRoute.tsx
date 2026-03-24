import { useSelector } from "react-redux";
import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const isLoading = useSelector((state: any) => state.user.is_loading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
