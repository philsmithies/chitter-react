import SignUpBtn from "../SignUpBtn";
import LogInBtn from "../LogInBtn";
import './index.css'

export default function SignUpBar() {
  return (
    <div className="SignUpBarWrapper">
      <h1>New To Chitter?</h1>
      <p>Sign up now to get your own personalized timeline!</p>
      <SignUpBtn/>
      <LogInBtn/>
    </div>
  )
}