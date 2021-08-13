import "./index.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Image } from "cloudinary-react";

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
          <h3>
            {" "}
            {props.username}
            <br />
            <span className="tweetsSpan">{props.length} tweets</span>
          </h3>
        </div>
      </div>
      <div className="bannerimg">
        <img
          src={process.env.PUBLIC_URL + "/img/banner.jpeg"}
          alt="banner"
        ></img>
      </div>
      <div className="bio_wrapper">
        <div className="follow_wrapper">
          {props.publicId ? (
            <Image
              className="profile_hero"
              cloudName="chitter"
              publicId={props.publicId}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/img/bluetit.jpg"}
              alt="new user"
              className="profile_hero"
            />
          )}
          <div className="followBtn">Follow</div>
        </div>
        <div className="bio_text">
          <h3>
            {props.fullName || ""}
            <br />
            <span>@{props.username}</span>
          </h3>
          <p>
            {props.bio || "New chipper"}
            <br />
            Joined August 2021
          </p>
        </div>
      </div>
    </div>
  );
}
