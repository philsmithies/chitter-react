import React, { useEffect, useState } from "react";
import Axios from "axios";
import './index.css'
// import { Link } from "react-router-dom";
// import { UserContext } from "../../Contexts/UserContext";
import { useParams } from "react-router-dom";
import ProfileTweet from "../../components/ProfileTweet/";
import ExploreBar from "../../components/ExploreBar";
import SignUpBar from "../../components/SignUpBar";
import Footer from "../../components/Footer";
import ProfileWrapper from "../../components/ProfileWrapper";

export default function Profile() {
  const [data, setData] = useState();
  const { userId } = useParams();

  const getProfileData = function (userId) {
    // const data = useContext(UserContext)
    console.log("getProfileData");
    if (!userId) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/user",
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    } else {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/user/" + userId,
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
        // console.log(res.data)
        // return (res.data);
      });
    }
  };

  useEffect(() => {
    console.log("user id is ", userId);

    getProfileData(userId);
  }, [userId]);

  return (
    <div className="profile_grid">
        {/* <div className="profile_photo">
          <img src={BlueTit} alt="new user" />
        </div> */}
        {data ? (
          <div>
          <div className="profile_wrapper">
            <ProfileWrapper username={data.username} length={data.tweets.length}/>
          </div>
           <div class="profile_content">
            {data.tweets.map((value, index) => (
              <div>
                <ProfileTweet tweet={value.body} username={value.username} />
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
        <div className="footer">
          <Footer />
        </div>
    </div>
  );
}
