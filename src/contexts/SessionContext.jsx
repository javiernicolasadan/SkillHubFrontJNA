/* import { useLocalStorage } from '@mantine/hooks' */
import { createContext, useEffect, useState } from 'react'

export const SessionContext = createContext()

const SessionContextProvider = ({ children }) => {
  // const [token, setToken] = useLocalStorage({ key: 'authToken' })
  const [token, setToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState();
  const [needRefreshUser, setNeedRefreshUser] = useState(false)

  const verifyToken = async currentToken => {
    /* console.log('isLoggedIn', isLoggedIn, 'isLoading', isLoading, 'start of verify func') */
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
      setIsLoading(false)
      /* console.log('isLoggedIn', isLoggedIn, 'isLoading', isLoading) */
    }else{
        setIsLoggedIn(false);
        setIsLoading(false)
    }
  }

  /* const userData = ()=>{

  } */

  useEffect(() => {
    const localToken = localStorage.getItem('authToken')
    if (localToken) {
      verifyToken(localToken)
    }else{
        setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token)
      verifyToken(token)
    } else {
      localStorage.removeItem('authToken')
    }
  }, [token])

  useEffect(()=>{
    if(needRefreshUser){
        verifyToken(token)
        setNeedRefreshUser(false)
    }
  },[needRefreshUser])

  const logout = () => {
    setToken()
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  return (
    <SessionContext.Provider value={{ token, setToken, isLoggedIn, isLoading, logout, currentUser, setIsLoggedIn, setNeedRefreshUser, setCurrentUser }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider