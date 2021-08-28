import SignUpBarBtn from "../Buttons/SignUpBarBtn";
import ProfileBtn from "../Buttons/ProfileBtn";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import "./index.css";
import { Link } from "react-router-dom";

export default function SignUpBar() {
  const { user } = useContext(UserContext);

  return (
    <div className="SignUpBarWrapper">
      {user ? (
        <div>
          <h2 className="welcome_title">Hello {user}</h2>
          <ProfileBtn username={user} />
          <Link to={"/logout"}>
            <SignUpBarBtn text={"Log Out"} />
          </Link>
        </div>
      ) : (
        <div>
          <h1>New To Chitter?</h1>
          <p>Sign up now to get your own personalized timeline!</p>
          <Link to={"/signup"}>
            <SignUpBarBtn text={"Sign Up"} />
          </Link>
          <Link to={"/login"}>
            <SignUpBarBtn text={"Log In"} />
          </Link>
        </div>
      )}
    </div>
  );
}
