import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(SessionContext)
  /* console.log(isLoading, isLoggedIn) */

  if (!isLoading && !isLoggedIn) {
    return <Navigate to='/login' />
  }

  return isLoading ? <h1>Loading...</h1> : <>{children}</>
}

export default PrivateRoute