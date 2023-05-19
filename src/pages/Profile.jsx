import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";


export default function Profile() {

    const {logout} = useContext(SessionContext)
 
  return (
    <>
      <div>Profile</div>
      <button type='button' onClick={logout}>Log Out</button>
  
    </>
  );
}
