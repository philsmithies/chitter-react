import './index.css'
import React, { useState } from "react";
import Axios from "axios";

export default function NewTweet() {

  const [tweet, setTweet] = useState('');

  const newTweet = async () => {
    try {
      await Axios.post("http://localhost:3001/new", {
        tweet: tweet,
      },
        {
          withCredentials: true,
        }).then((response) => {
          console.log(response);
          if (response.data) {
            window.location.href = "/";
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <div>
      <form onSubmit={newTweet}>
        <label for="body">Tweet:</label>
        <input type="text" id="tweet" name="tweet" required  onChange={(e) => {
          setTweet(e.target.value);
          }}/>
        <button>Submit</button>
      </form>
      </div>
  )
}
