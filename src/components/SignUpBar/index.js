import SignUpBarBtn from "../Buttons/SignUpBarBtn";
import ProfileBtn from "../Buttons/ProfileBtn";
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
          <ProfileBtn username={data.username} />
          <SignUpBarBtn text={"Sign Out"} link={'/signout'}/>
        </div>
      ) : (
        <div>
          <h1>New To Chitter?</h1>
          <p>Sign up now to get your own personalized timeline!</p>
          <SignUpBarBtn text={"Sign Up"} link={"/signup"}/>
          <SignUpBarBtn text={"Log In"} link={"/login"}/>
        </div>
      )}
    </div>
  );
}
