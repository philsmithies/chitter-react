import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { Link } from "react-router-dom";
// import { UserContext } from "../../Contexts/UserContext";
import BlueTit from "./bluetit.jpeg";
import { useParams } from "react-router-dom";
// import Tweet from "../../components/Tweet/";

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
    <div>
      <div className="profile_photo">
        <img src={BlueTit} alt="new user" />
      </div>
      {data ? (
        <div>
          <p>The Profile Page of {data.username}</p>
          {data.tweets.map((value, index) => (
            <div>
              <p>Value {value.body}</p>
              <p>User {value.username}</p>
              <p>Created At {value.createdAt}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
