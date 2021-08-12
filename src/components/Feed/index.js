import { useState, useEffect } from 'react';
import axios from "axios";
import Tweet from '../Tweet/'
import './index.css'

export default function Feed() {
  const [data, setData] = useState();
  const [userId, setUserId] = useState("123");
  const [tweetId, setTweetId] = useState()
  const [allData, setAllData] = useState([]);

  const getTweets = () => {
    axios("http://localhost:3001/tweets")
      .then((response) => {
        setAllData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  }

  const getTweet = async () => {
    try {
      await axios.get(
        "http://localhost:3001/tweets/" + tweetId,
      ).then((response) => {
        console.log(response);
      });
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getTweet()
    getTweets()
  }, []);

  return(
    <div>
      {allData.map((value, index) => (
        <div class="tweets_feed">
          <Tweet tweetId={value._id} text={value.text} username={value.username} createdAt={value.createdAt} publicId={data ? data.publicId : ''} />
        </div>
      ))}
    </div>
  )
}