import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";

export default function LogInForm() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [data, setData] = useState(null);

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername.toLowerCase(),
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => {
      if (res.data === "Successfully Authenticated") {
        window.location.href = "/";
      }
    });
  };

  return (
    <form autoComplete="off">
      <TextField
        id="standard-full-width"
        label="username"
        placeholder="@jim"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setLoginUsername(e.target.value);
        }}
      />
      <TextField
        type="password"
        id="standard-full-width"
        label="password"
        placeholder="***********"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setLoginPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        style={{ margin: 30, backgroundColor: "lightblue" }}
        onClick={login}
      >
        Submit
      </Button>
    </form>
  );
}
