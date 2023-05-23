/* import { useLocalStorage } from '@mantine/hooks' */
import { createContext, useEffect, useState } from 'react'

export const SessionContext = createContext()

const SessionContextProvider = ({ children }) => {
  // const [token, setToken] = useLocalStorage({ key: 'authToken' })
  const [token, setToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState();

  const verifyToken = async currentToken => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    })
    if (response.status === 200 || response.status === 304) {
      const parsed = await response.json()
      setToken(currentToken)
      setCurrentUser(parsed.user)
      setIsLoggedIn(true)
    }else{
        setIsLoggedIn(false);
        setIsLoading(false)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const localToken = localStorage.getItem('authToken')
    if (localToken) {
      verifyToken(localToken)
    }else {
        setIsLoading(false);
      }
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token)
      setIsLoading(false)
    } else {
      localStorage.removeItem('authToken')
    }
  }, [token])

  const logout = () => {
    setToken()
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
  }

  return (
    <SessionContext.Provider value={{ token, setToken, isLoggedIn, isLoading, logout, currentUser }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider