import ExploreBar from "../../components/ExploreBar";
import SignUpBar from "../../components/SignUpBar";
import Feed from "../../components/Feed";
import "./styles.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";

export default function Home() {
  const getProfileData = async () => {
    return {
      id: 4,
      username: "bob",
      email: "bob of bob",
    };
  };

  const { user, setUser } = useContext(UserContext);
  return (
    <div className="main_grid">
      <div className="main_content">
        <Feed />
      </div>
      <div className="sidebar">
        <ExploreBar />
      </div>
      <div className="signupbar">
        <SignUpBar />
        <p className="project_text">
          This is a project by{" "}
          <a className="name_text" href="www.github.com/philsmithies">
            <span>Phil Smithies.</span>
          </a>
        </p>
      </div>
    </div>
  );
}
