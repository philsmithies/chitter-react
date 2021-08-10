import Bird from "./bird.png";
import Hashtag from "./hashtag.png";
import TweetModal from "../TweetModal";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import "./index.css";

export default function ExploreBar() {
  const data = useContext(UserContext);
  return (
    <div class="explore_wrapper">
      <div>
        <a href="/">
          <img src={Bird} className="birdLogo" alt="chitter logo" />
        </a>
      </div>
      <div>
        {data ? <TweetModal /> : <TweetModal link={"/signup"} />}
        <a href="/">
          <h1 className="menuItem">
            <img src={Hashtag} alt="hashtag" className="hashtag" /> Explore
          </h1>
        </a>
      </div>
    </div>
  );
}
