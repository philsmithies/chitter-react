import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Axios from "axios";

export default function SignUpForm() {

  // const url = 'https://api.cloudinary.com/v1_1/dryaxqxie/image/upload';
  // const preset = 'cyber_photos';
  const [image, setImage] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [usernameReg, setUsernameReg] = useState('');

  const onChange = e => {
    setImage(e.target.files[0]);
    const file = e.target.files[0]
  };

  const register = async () => {
    // const formData = new FormData();
    // formData.append('file', image);
    // formData.append('upload_preset', preset);
    // const res = await Axios.post(url, formData);
    // const imageUrl = res.data.secure_url;
    try {
      await Axios.post("http://localhost:3001/signup", {
        username: usernameReg,
        password: passwordReg,
        email: emailReg,
        // publicId: imageUrl,
      },
        {
          withCredentials: true,
        }).then((response) => {
          console.log(response);
          if (response.data) {
            window.location.href = "/login";
          }
        });
    } catch (err) {
      console.error(err);
    }
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
          setUsernameReg(e.target.value);
          }}
      />
      <TextField
        type="email"
        id="standard-full-width"
        label="email"
        placeholder="jack@chitter.com"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setEmailReg(e.target.value);
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
          setPasswordReg(e.target.value);
        }}
      />
       <input
        type="file"
        hidden
        onChange={onChange}
        style={{display: 'none'}}
        />
      {/* <TextField
        type="password"
        id="standard-full-width"
        label="confirm password"
        placeholder="***********"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
      <Button variant="contained" color="primary" style={{ margin: 30 }} onClick={register}>
        Submit
      </Button>
    </form>
  );
}
