import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

export default function User() {
  const data = useContext(UserContext);
  return(
    <div>User is here
    {data ? (
      <Link to="/">
        <p>Link here</p>
      </Link>
    ) : null}
    
    </div>
  )
}