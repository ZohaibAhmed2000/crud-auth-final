import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import InputComp from '../muiComponents/InputComp'

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = React.useState({
        password: '',
        email: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = () => {
        const { email, password } = values
        const objToSend = {
            email,
            password
        }
        axios.post("http://localhost:5000/api/login", objToSend)
            .then((res) => {
                toast.success('Successfully Login!')
                console.log(res, "RES");
                console.log(res.data.token)
                localStorage.setItem("token",res.data.token)
            //    setTimeout(() => {
            //     navigate("/")
            //    }, 2500); 
            navigate("/")
            })
            .catch((err) => { 
                console.log(err, "ERR");
                toast.error("Credential Error") 
            })

    }
    return (
        <>
            <div className="wrapper">
                <div className="sign-box">
                    <h1 style={{ marginBottom: "5%" }}>Login</h1>
                    <div>
                        <InputComp label="Email" onChange={handleChange('email')} />
                        {/* <InputComp label="Password"/> */}
                    </div>
                    <div>
                        <FormControl sx={{ width: '73%' }} variant="outlined">
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
                    <button className='btn' onClick={handleSubmit}>Login</button>
                    <div></div>
                </div>
            </div>
            <Toaster />

        </>
    )
}

export default Login