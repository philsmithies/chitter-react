import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { useParams } from "react-router-dom";
import Tweet from "../../components/Tweet/";
import ExploreBar from "../../components/ExploreBar";
import EditModal from "../../components/EditModal";
import SignUpBar from "../../components/SignUpBar";
import ProfileWrapper from "../../components/ProfileWrapper";

export default function Profile() {
  const [data, setData] = useState();
  const [tweets, setTweets] = useState();
  const [user, setUser] = useState();
  const { userId } = useParams();

  const getProfileData = function (userId) {
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
        // console.log(data.bioPhotoId);
      });
    }
  };

  const getTweets = async () => {
    try {
      await axios
        .get("http://localhost:3001/users/" + userId + "/tweets/")
        .then((response) => {
          setTweets(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfileData(userId);
    getTweets();
  }, []);

  const EditButton = () => {
      if (user) {
        console.log(user)
        return <EditModal/>;
      }
    }
    return <p>no</p>;
  }

  return (
    <div className="profile_grid">
      {data ? (
        <div className="profile_wrapper">
          <ProfileWrapper
            username={data.username}
            bio={data.bio ? data.bio : "New Chipper"}
            fullName={data.fullName}
            length={tweets ? tweets.length : ""}
            cloudName="chitter"
            publicId={data.publicId}
            bioPhotoId={data.bioPhotoId}
            createdAt={data.createdAt}
          />
          <div className="profile_content">
          <editButton/>
            {tweets
              ? tweets.map((value, index) => (
                  <Tweet
                    key={index}
                    fullName={value.author.fullName}
                    publicId={value.author ? value.author.publicId : ""}
                    imageUrl={value.author.imageUrl ? value.author.imageUrl : ""}
                    text={value.text}
                    username={value.author ? value.author.username : ""}
                    createdAt={value.createdAt}
                  />
                ))
              : ''}
          </div>
        </div>
      ) : null}
      <div className="sidebar">
        <ExploreBar />
      </div>
      <div className="signupbar">
        <SignUpBar />
        {/* <EditButton/> */}
      </div>
    </div>
  );
}
