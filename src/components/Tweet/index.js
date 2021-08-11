import "./index.css";
import BlueTit from "./bluetit.jpeg";
import RepeatIcon from "@material-ui/icons/Repeat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LinkIcon from "@material-ui/icons/Link";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { format } from "date-fns";
import { Image } from "cloudinary-react";

export default function Tweet(props) {
  const formatDate = (date) => {
    return format(new Date(date), "E MMM dd yyyy");
  };

  return (
    <div>
      <div className="tweet_wrapper">
        <div className="profile_photo">
          {props.publicId ? (
            <Image
              className="profile_photo"
              cloudName="chitter"
              publicId={props.publicId}
            />
          ) : (
            <img src={BlueTit} alt="new user" />
          )}
        </div>
        <div className="tweet_content">
          <div className="username">
            <a href={`profile/${props.username}`} className="profileLinks">
              <strong>{props.username}</strong>
              <small className="usernameText">@{props.username}</small>
              <small className="dateText">{formatDate(props.createdAt)}</small>
            </a>
            {/* <div className="threeDots">
              <MoreHorizIcon/>
            </div> */}
          </div>

          <div className="bodyText">{props.tweet}</div>
          <div className="bodyText">{props.likes[0]}</div>
          <div className="tweet_functions">
            <ChatBubbleOutlineIcon className="chatBubble" />
            <RepeatIcon className="retweet" />
            <FavoriteBorderIcon className="heart" />
            <LinkIcon className="link" />
          </div>
        </div>
      </div>
    </div>
  );
}
