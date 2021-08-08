import { useState, useEffect } from 'react';
import axios from "axios";

export default function Feed() {
  const [allData, setAllData] = useState([]);


  useEffect(() => {
    axios("http://localhost:3001/tweets")
      .then((response) => {

        console.log(response.data);
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
          <strong>Tweet is:{value.body}</strong>
          <p>User is:{value.username}</p>
        </div>
      ))}
      Feed
    </div>
  )
}