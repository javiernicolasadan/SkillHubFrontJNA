import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  const { isLoggedIn, isLoading } = useContext(SessionContext);
  const [showMessage, setShowMessage] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setTimeout(() => {
        setShowMessage(false);
        setRedirect(true);
      }, 4000);
    }else{
      setShowMessage(false)
    }
  }, [isLoggedIn, isLoading]);

  if (redirect) {
    setRedirect(false)
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
