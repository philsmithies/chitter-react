import React, { useState, createContext, useEffect } from "react";

import Axios from "axios";

// This will hold the context
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [data, setData] = useState();

  // Fetch Method to get the data
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      headers: {"x-access-token": localStorage.getItem("token")},
      url: "http://localhost:3001/isUserAuth",
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;