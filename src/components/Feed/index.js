import { useState, useEffect } from 'react';
import axios from "axios";
import Tweet from '../Tweet/'

export default function Feed() {
  const [allData, setAllData] = useState([]);


  useEffect(() => {
    axios("http://localhost:3001/tweets")
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  }, []);

  return(
    <div>
      {allData.map((value, index) => (
        <div>
          <Tweet tweet={value.body} username={value.username}/>
        </div>
      ))}
    </div>
  )
}