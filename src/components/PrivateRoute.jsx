import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  const { isLoggedIn, isLoading } = useContext(SessionContext);
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    if (!isInitialLoad && !isLoggedIn) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setRedirect(true);
      }, 4000);
    }
  }, [isLoggedIn, isInitialLoad]);

  useEffect(()=>{
    if(!isLoading){
        setIsInitialLoad(false)
    }
  },[isLoading])

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {
        showMessage ? <p>You need to log in</p>
      :isLoading ? <p>Loading...</p>
      : <>{children}</>
      }

    </>
  );
}
