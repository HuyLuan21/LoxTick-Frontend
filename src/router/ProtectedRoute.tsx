import { Navigate } from "react-router"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const isLoggedIn = false 

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}