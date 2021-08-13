import React, { useEffect, useState } from "react";
import "./index.css";
import Axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

export default function TweetModal(props) {
  const data = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    if(props.link){
      window.location.href='/signup';
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    console.log("closed");
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (e.target.className !== "modal" && e.target.className !== "button") {
  //       closeModal()
  //     }
  //   };
  //   if (isOpen) {
  //     console.log('open')
  //     window.addEventListener("click", handleClick);
  //   }
  // }, [isOpen]);

  const [tweet, setTweet] = useState("");

  const newTweet = async () => {
    try {
      await Axios.post(
        "http://localhost:3001/tweets/" + data.username + "/create/",
        {
          text: tweet,
          author: data
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        console.log(response);
        if (response.data) {
          window.location.href = "/";
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <header className="modal__header">
              <div onClick={closeModal} className="close-button">
                &times;
              </div>
            </header>
            <main className="modal__main">
              <div>
                <form onSubmit={newTweet}>
                  <input
                    type="text"
                    id="tweet"
                    name="tweet"
                    placeholder="Whats on your mind?"
                    required
                    onChange={(e) => {
                      setTweet(e.target.value);
                    }}
                  />
                  <button className="submitBtn">
                    <p>Tweet</p>
                  </button>
                </form>
              </div>
            </main>
          </div>
        </>
      )}

      <button className="button" onClick={openModal}>
        Tweet
      </button>
    </div>
  );
}
