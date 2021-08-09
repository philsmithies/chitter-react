import SignUpBtn from "../SignUpBtn";
import LogInBtn from "../LogInBtn";
import ProfileBtn from "../ProfileBtn";
import LogOutBtn from "../LogOutBtn";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import "./index.css";

export default function SignUpBar() {
  const data = useContext(UserContext);
  return (
    <div className="SignUpBarWrapper">
      {data ? (
        <div>
          <h2>Hello {data.username}</h2>
          <ProfileBtn />
          <LogOutBtn />
        </div>
      ) : (
        <div>
          <h1>New To Chitter?</h1>
          <p>Sign up now to get your own personalized timeline!</p>
          <SignUpBtn />
          <LogInBtn />
        </div>
      )}
    </div>
  );
}
