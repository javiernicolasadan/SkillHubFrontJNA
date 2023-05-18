/* import React from 'react' */

import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
        <div>Homepage</div>
        <Link to={'/signup'}>Signup</Link>
        <Link to={'/login'}>Login</Link>

    </>
  )
}
