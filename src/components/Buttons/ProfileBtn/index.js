import "./index.css";

export default function ProfileBtn(props) {
  return (
    <div>
      <a href={`/profile/` + props.username} className="SignUpLink">
        <div className="logInBtn">
          <p>Profile</p>
        </div>
      </a>
    </div>
  );
}
