import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { useParams } from "react-router-dom";
import Tweet from "../../components/Tweet/";
import ExploreBar from "../../components/ExploreBar";
import SignUpBar from "../../components/SignUpBar";
import ProfileWrapper from "../../components/ProfileWrapper";

export default function Profile() {
  const [data, setData] = useState();
  const [tweets, setTweets] = useState();
  const { userId } = useParams();

  useEffect(() => {
    const getProfileData = function (userId) {
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
          setData(res.data);
        });
      }
    };
  
    const getTweets = async () => {
      try {
        await axios
          .get("http://localhost:3001/users/" + userId + "/tweets/")
          .then((response) => {
            setTweets(response.data);
            console.log(tweets);
          });
      } catch (err) {
        console.error(err);
      }
    };

    getProfileData(userId)
    getTweets()

  }, [tweets, userId]);

  return (
    <div className="profile_grid">
      {data ? (
        <div>
          <div className="profile_wrapper">
            <ProfileWrapper
              username={data.username}
              fullName={data.fullName}
              length={tweets ? tweets.length : ""}
              cloudName="chitter"
              publicId={data.publicId}
            />
          </div>
          <div class="profile_content">
            {tweets
              ? tweets.map((value, index) => (
                  <div>
                    <Tweet
                      key={index}
                      fullName={value.author.fullName}
                      publicId={value.author ? value.author.publicId : ""}
                      text={value.text}
                      username={value.author ? value.author.username : ""}
                      createdAt={value.createdAt}
                    />
                  </div>
                ))
              : ""}
          </div>
        </div>
      ) : null}
      <div className="sidebar">
        <ExploreBar />
      </div>
      <div className="signupbar">
        <SignUpBar />
      </div>
    </div>
  );
}
