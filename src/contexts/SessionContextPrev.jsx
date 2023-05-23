import { createContext, useEffect, useState } from "react";
/* import { useLocalStorage } from '@mantine/hooks'; */

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const verifyToken = async (currentToken) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("authToken", currentToken);
      setToken(currentToken);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      /* console.log("User Info:", data.user); */
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    //if the local token has not expired
    if (localToken) {
      verifyToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
        verifyToken(token)
      /* localStorage.setItem("authToken", token);
      setIsLoggedIn(true) */;
    } /* else {
          localStorage.removeItem('authToken');
          setIsLoggedIn(false);
        } */
  }, [token, currentUser]);


  //using the mantinke hook!!!
  /* const [token, setToken] = useLocalStorage({key: 'authToken'}) */

  const logout = () => {
    setToken();
    localStorage.removeItem("authToken");
    /* setStoredToken(null) */
    setIsLoggedIn(false);
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        isLoading,
        logout,
        setIsLoggedIn,
        currentUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
