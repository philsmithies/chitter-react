import './index.css'

export default function Tweet(props) {
  return(
    <div>
      <div className="tweet_wrapper">
        <div className="profile_photo">

        </div>
        <div className="tweet_content">
          <div className="username">
            User: {props.username}
          </div>
          <div className="body">
            Tweet: {props.tweet}
          </div>
          <div className="tweet_functions">
            all the tweet functions
          </div>
        </div>
      </div>
    </div>
  )
}