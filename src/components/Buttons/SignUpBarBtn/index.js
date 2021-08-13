import './index.css'
import { Link } from "react-router-dom";

export default function SignUpBarBtn(props) {
  return (
    <div> 
      <Link to={props.link} className="SignUpLink">
        <div className="logInBtn">
          <p>{props.text}</p>
        </div>
      </Link>
    </div>
  )
}