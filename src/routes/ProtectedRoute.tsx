import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import type { JSX } from 'react'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
