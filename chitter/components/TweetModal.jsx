import react from "react";
import { useState } from "react";
import useSwr from "swr";

const TweetModal = () => {
  const [tweet, setTweet] = useState("");

  const postTweet = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/tweets", {
      body: JSON.stringify({
        text: tweet,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    // result.user => 'Ada Lovelace'
  };

  // const { data, error } = useSwr("/api/tweets", handler);

  return (
    <div>
      <input
        placeholder="tweet here"
        onChange={(e) => {
          setTweet(e.target.value);
        }}
      />
      <button className="border-2" onClick={postTweet}>
        Tweet
      </button>
    </div>
  );
};

export default TweetModal;
