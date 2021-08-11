import { useState, useEffect } from 'react';
import axios from "axios";
import Tweet from '../Tweet/'
import './index.css'

export default function Feed() {
  const [data, setData] = useState();
  const [userId, setUserId] = useState("123");
  const [tweetId, setTweetId] = useState()
  const [allData, setAllData] = useState([]);

  const getProfilePhoto = function (userId) {
    console.log("getProfileData");
    if (!userId) {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/profile",
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    } else {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/profile/" + userId,
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    }
  };

  const getTweets = () => {
    axios("http://localhost:3001/tweets")
      .then((response) => {
        setAllData(response.data);
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
    getProfilePhoto(userId);
    getTweets()
  }, []);

  return(
    <div>
      {allData.map((value, index) => (
        <div class="tweets_feed">
          <Tweet id={value._id} tweet={value.body} username={value.username} createdAt={value.createdAt} publicId={data ? data.publicId : ''} likes={value.likes.length}/>
        </div>
      ))}
    </div>
  )
}