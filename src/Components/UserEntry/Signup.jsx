import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {decodeToken} from 'react-jwt'


const Signup = () => {
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
            firstname:"",
            lastname:"",
              email: "",
              password: ""
          },
          onSubmit: (details) => {
              signupFunction(details)
              setClick(true)
              setMessage()

          }
      }
  )

// Signup process
const signupFunction = async(details) => {
try {
 const response = await fetch("https://taskday44-url-shortner.onrender.com/signup",{
    method:"POST",
    body:JSON.stringify(details),
    headers:{
      "Content-Type":"application/json"
    }
  })

  const data = await response.json()
setClick(false)
  if(!data.message){
    setMessage("Successfully Signuped and an account activation link has been sent to your email")
  }else{
    setMessage(data.message)
  }
  
} catch (error) {
  console.log("Signup error",error)
}
}

  return (
         <div className="formdiv userEntryDiv">
            
            <form className='form' onSubmit={handleSubmit}>
            <div className="tittle">SIGNUP</div>
            {
                message && <div className="message">{message}</div>
            }

            
            <TextField
                    required
                    label="FIRST NAME"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    name="firstname"
                />
                <TextField
                    required
                    label="LAST NAME"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    name="lastname"
                />
            
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
                        "SIGNUP NOW"
                    }
                </Button>

               <div className="links">
               <a href="/login" style={{textAlign:"center"}}>Already have an account</a>
               <a href="/activate" style={{textAlign:"center"}}>Activate your account</a>

               </div>

            </form>
        </div>
  )
}

export default Signup