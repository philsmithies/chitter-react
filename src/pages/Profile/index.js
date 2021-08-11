import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./index.css";
import { useParams } from "react-router-dom";
import ProfileTweet from "../../components/ProfileTweet/";
import ExploreBar from "../../components/ExploreBar";
import SignUpBar from "../../components/SignUpBar";
import ProfileWrapper from "../../components/ProfileWrapper";

export default function Profile() {
  const [data, setData] = useState();
  const { userId } = useParams();

  const getProfileData = function (userId) {
    console.log("getProfileData");
    if (!userId) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/profile",
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    } else {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/profile/" + userId,
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    }
  };

  useEffect(() => {
    console.log("user id is ", userId);
    getProfileData(userId);
  }, [userId]);

  return (
    <div className="profile_grid">
      {data ? (
        <div>
          <div className="profile_wrapper">
            <ProfileWrapper
              username={data.username}
              fullName={data.fullName}
              length={data.tweets.length}
              cloudName="chitter"
              publicId={data.publicId}
            />
          </div>
          <div class="profile_content">
            {data.tweets.map((value, index) => (
              <div>
                <ProfileTweet tweet={value.body} username={value.username} publicId={data.publicId}/>
              </div>
            ))}
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
