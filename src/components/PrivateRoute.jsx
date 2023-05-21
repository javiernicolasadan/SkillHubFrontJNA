import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  const { isLoggedIn, isLoading } = useContext(SessionContext);
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setShowMessage(true)
      const redirectTimer = setTimeout(()=>{
        setRedirect(true)
      }, 4000)

      return ()=>{
        clearTimeout(redirectTimer)
      }
      /* setTimeout(() => {
        setShowMessage(false);
        setRedirect(true);
      }, 4000); */
    }/* else{
      setShowMessage(false)
    } */
  }, [isLoggedIn, isLoading]);

  if (redirect) {
    /* setRedirect(false) */
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
