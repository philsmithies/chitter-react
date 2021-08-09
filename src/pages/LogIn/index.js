import LogInForm from "../../components/LogInForm"
import './index.css'
import Footer from "../../components/Footer"

export default function LogIn() {
  return(
    <div className="logInWrapper">
    <div className="logInForm"> 
      <h2>Log In</h2>
      <LogInForm/>
    </div>
    <Footer/>
    </div>
  )
}