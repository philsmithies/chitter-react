import SignUpForm from "../../components/SignUpForm"
import './index.css'
import Footer from "../../components/Footer"

export default function SignUp() {
  return(
    <div className="signUpWrapper">
    <div className="signUpForm"> 
      <h2>Sign Up To Chitter</h2>
      <SignUpForm/>
    </div>
    <Footer/>
    </div>
  )
}