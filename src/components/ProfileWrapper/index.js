import "./index.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function ProfileWrapper(props) {
  return (
    <div className="profile_wrapper">
      <div className="profile_functions">
        <div className="arrow">
          <a href="/">
            <ArrowBackIcon />
          </a>
        </div>
        <div className="functions_text">
          <h3> {props.username}</h3>
          <p>{props.length} tweets</p>
        </div>
      </div>
    </div>
  );
}
