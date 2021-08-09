import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';

export default function LogInForm() {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <TextField
        id="standard-full-width"
        label="username"
        placeholder="@jim"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
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
      />
      <Button variant="contained" color="primary" style={{ margin: 30 }} type="submit">
        Submit
      </Button>
    </form>
  );
}
