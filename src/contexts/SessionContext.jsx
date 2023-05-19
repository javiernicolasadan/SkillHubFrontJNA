import { createContext, useEffect, useState } from "react";
/* import { useLocalStorage } from '@mantine/hooks'; */

export const SessionContext = createContext()

const SessionContextProvider = ({children}) => {
    const [token, setToken] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const verifyToken=async(currentToken)=>{
        const response = await fetch('http://localhost:5005/auth/verify',{
            headers:{
                'Authorization' : `Bearer ${currentToken}`
            }
        })
        if(response.status === 200){
            const parsed = await response.json()
            setToken(currentToken)
            setIsLoggedIn(true)
        }
        setIsLoading(false)
    }
    
    useEffect(() => {
        if (token) {
          localStorage.setItem('authToken', token);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('authToken');
          setIsLoggedIn(false);
        }
      }, [token]);

    useEffect(()=>{
        const localToken = localStorage.getItem('authToken')
        //if the local token has not expired
        if(localToken){
            verifyToken(localToken)
        }
    },[])

    //using the mantinke hook!!!
    /* const [token, setToken] = useLocalStorage({key: 'authToken'}) */

    const logout = ()=>{
        setToken()
        localStorage.removeItem('authToken')
        setIsLoggedIn(false)
    }



    return (
    <SessionContext.Provider value={{token, setToken, isLoggedIn, isLoading, logout}}>{children}</SessionContext.Provider>
    )
  }

  export default SessionContextProvider