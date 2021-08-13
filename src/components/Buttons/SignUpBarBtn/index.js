import "./index.css";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function SignUpBarBtn(props) {
  const logOut = () => {
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
      {props.text === "Log Out" ? (
        <Link to={props.link} className="SignUpLink" onClick={logOut}>
          <div className="logInBtn">
            <p>{props.text}</p>
          </div>
        </Link>
      ) : (
        <Link to={props.link} className="SignUpLink">
          <div className="logInBtn">
            <p>{props.text}</p>
          </div>
        </Link>
      )}
    </div>
  );
}
