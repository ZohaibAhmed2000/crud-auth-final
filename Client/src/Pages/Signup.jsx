import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import InputComp from '../muiComponents/InputComp'

export const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
    showPassword: false,
    showConfirmPassword: false,
  })
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = () => {
    console.log(values)
    const { fname, lname, email, password } = values
    const objToSend = {
      fname,
      lname,
      email,
      password
    }
    console.log(objToSend)
    axios.post("http://localhost:5000/api/signup", objToSend)
      .then((res) => {
        toast.success("User Created Successfully!")
        console.log(res, "Response");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message, "err");

         toast.error(err.response.data.message)
      })
  }
  return (
    <>
      <div className="wrapper">
        <div className='sign-box'>
          <h1>SignUp</h1>
          <div>
            <div>
              <InputComp label="First Name" onChange={handleChange('fname')} />
            </div>
            <div>
              <InputComp label="Last Name" onChange={handleChange('lname')} />
            </div>
            <div>
              <InputComp label="Email" onChange={handleChange('email')} />
            </div>
            <div>
              {/* <InputComp label="Password" onChange={handleChange('password')}/> */}
              <FormControl sx={{ width: "73%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <div>
              {/* <InputComp label="Confirm Password" onChange={handleChange('confirm')}/> */}
              <FormControl sx={{ width: "73%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showConfirmPassword ? 'text' : 'password'}
                  value={values.confirm}
                  onChange={handleChange('confirm')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </div>
          </div>
          <button className='btn' onClick={handleSubmit}>SignUp</button>
          <p style={{ marginTop: "5%" }}>Already have an account? <Link to="/login">Login Now </Link></p>
        </div>
      </div>
      <Toaster />
    </>
  )
}
