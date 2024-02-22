import { Box, Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './UserEntry.css'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { decodeToken } from 'react-jwt';

const Login = () => {
    const history = useHistory()
    const [message, setMessage] = useState()
    const [click, setClick] = useState(false)

    useEffect(()=>{
        const getUrls = async() => {
     
         // getting token from header
         const token = localStorage.getItem("usertoken")
     
         // validating the header token
         const user = decodeToken(token)
       
         if(user) { 
           history.replace("/")
         }
         
        }
     
        getUrls()
        
       },[])

    // validates through formik
    const { handleSubmit, handleBlur, handleChange, values } = useFormik(
        {
            initialValues: {
                email: "",
                password: ""
            },
            onSubmit: (details) => {
                loginFunction(details)
                setClick(true)
                setMessage()

            }
        }
    )

    // customer login

    const loginFunction = async (details) => {

        try {
            const response = await fetch("https://taskday44-url-shortner.onrender.com/login", {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json"
                }

            })
            const data = await response.json()

            setMessage(data.message)
            setClick(false)
            // if login successfully it will push to dashboard path
            if (data.token) {
                localStorage.setItem("usertoken", data.token)
                history.push("/")
            }

        } catch (error) {
            console.log("Login Error", error)
        }
    }

    return (
         <div className="formdiv userEntryDiv">
            
            <form className='form' onSubmit={handleSubmit}>
            <div className="tittle">LOGIN</div>
            {
                message && <div className="message">{message}</div>
            }
                <TextField
                    required
                    label="EMAIL"
                    variant="outlined"
                    type='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                />
                <TextField
                    required
                    label="PASSWORD"
                    variant="outlined"
                    type='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    
                />

                <Button type='submit' variant='contained' color='success'>

                    {
                    click ? 
                    <Box sx={{ display: 'flex', justifyContent: "center" }}>
                        <CircularProgress color="inherit" size="24.8px"/>
                    </Box>
                        :
                        "LOGIN NOW"
                    }
                </Button>

               <div className="links">
               <a href="/signup" >Create new account</a>
               <a href="/activate" >Activate your account</a>
               <a href="/forgot" >Forgot your password</a>
               </div>

            </form>
        </div>
    )
}

export default Login