import "./index.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BannerImg from "./banner.jpeg";
import BlueTit from "./bluetit.jpeg";
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
          <h3> {props.username}
          <br/>
          <span className="tweetsSpan">
          {props.length} tweets
          </span>
          </h3>
        </div>
      </div>
      <div className="bannerimg">
        <img src={BannerImg} alt="banner"></img>
      </div>
      <div className="bio_wrapper">
        <div className="follow_wrapper">
          <Image
            className="profile_hero"
            cloudName="chitter"
            publicId={props.publicId}
          />
          <div className="followBtn">Follow</div>
        </div>
        <div className="bio_text">
          <h3>
            Paul<br/>
            <span>@{props.username}</span>
          </h3>
          <p>
            First Bio.
            <br />
            Joined August 2021
          </p>
        </div>
      </div>
    </div>
  );
}
