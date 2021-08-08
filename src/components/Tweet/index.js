import './index.css'
import Feather from './feather.png'
import RepeatIcon from '@material-ui/icons/Repeat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LinkIcon from '@material-ui/icons/Link';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { format } from 'date-fns'

export default function Tweet(props) {
  return(
    <div>
      <div className="tweet_wrapper">
        <div className="profile_photo">
          <img src={Feather} alt="new user"/>
        </div>
        <div className="tweet_content">
          <div className="username">
            <strong>{props.username}</strong> <small>@{props.username} {props.createdAt}</small>
            {/* <div className="threeDots">
              <MoreHorizIcon/>
            </div> */}
          </div>
          <div className="body">
            {props.tweet}
          </div>
          <div className="tweet_functions">
            <ChatBubbleOutlineIcon className="chatBubble"/>
            <RepeatIcon className="retweet"/>
            <FavoriteBorderIcon className="heart"/>
            <LinkIcon className="link"/>
          </div>
        </div>
      </div>
    </div>
  )
}