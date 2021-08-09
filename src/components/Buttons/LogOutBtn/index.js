import React from "react";
import "./index.css";
import Axios from "axios";

export default function LogOutBtn() {
  // const data = useContext(UserContext);
  const logout = () => {
    Axios.get("http://localhost:3001/logout", {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data === "success") {
        return (window.location.href = "/");
      }
    });
  };

  return (
    <div>
      <a href="/" onClick={logout} className="SignUpLink">
        <div className="logInBtn">
          <p>Log Out</p>
        </div>
      </a>
    </div>
  );
}
