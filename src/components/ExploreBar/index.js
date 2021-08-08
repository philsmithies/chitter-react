import Bird from "./bird.png";
import Hashtag from "./hashtag.png";
import TweetBtn from "../TweetBtn";
import "./index.css";

export default function ExploreBar() {
  return (
    <div class="explore_wrapper">
      <div>
        <a href="#">
          <img src={Bird} className="birdLogo" alt="chitter logo" />
        </a>
      </div>
      <div>
        <a href="#">
          <h1 className="menuItem">
            <img src={Hashtag} alt="hashtag" className="hashtag" /> Explore
          </h1>
        </a>
      </div>
      <TweetBtn id="tweetbtn" />
    </div>
  );
}
