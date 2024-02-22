import { Box, Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Route, Switch, useHistory, useParams } from 'react-router-dom'
import {decodeToken} from 'react-jwt'

const Forgot = () => {

  return (
    <div className='userEntryDiv'>
      <Switch>
        <Route exact path='/forgot'>
          <ForgotEmailSending />
        </Route>
        <Route path='/forgot/:id'>
          <ValidateUrl />
        </Route> 
      </Switch>

    </div>
  )
}


// EMAIL SENDING PROCESS:
const ForgotEmailSending = () => {

  const [message, setMessage] = useState()
  const [click, setClick] = useState(false)
  const history =useHistory()

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
        email: ""
      },
      onSubmit: (details) => {
        forgotFunction(details)
        setClick(true)
        setMessage()

      }
    }
  )

  // user forgot function

  const forgotFunction = async (details) => {

    try {
      const response = await fetch("https://taskday44-url-shortner.onrender.com/forgot", {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json"
        }

      })
      const data = await response.json()

      setMessage(data.message)
      setClick(false)


    } catch (error) {
      console.log("Login Error", error)
    }
  }

  return (
    <div className="formdiv">

      <form className='form' onSubmit={handleSubmit}>
        <div className="tittle">FORGOT PASSWORD</div>
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


        <Button type='submit' variant='contained' color='success'>

          {
            click ?
              <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <CircularProgress color="inherit" size="24.8px" />
              </Box>
              :
              "RESET NOW"
          }
        </Button>

        <div className="links">
          <a href="/signup" >Create new account</a>
          <a href="/activate" >Activate your account</a>
          <a href="/login" >I remember my password</a>
        </div>

      </form>
    </div>
  )
}


// VALIDATING THE URL 

const ValidateUrl = () => {
  const [message, setMessage] = useState()
  const [fetched, setFetched] = useState(false)
  const params = useParams()
  const history =useHistory()


  useEffect(() => {
    const validatingUrl = async () => {
      try {
        const response = await fetch(`https://taskday44-url-shortner.onrender.com/forgot/${params.id}`, {
          method: "GET"
        })
        const data = await response.json()
  
        setMessage(data.message)
        setFetched(true)
     
  if(data.message === "You can reset your password now") {
    localStorage.setItem("userId",data.tokken.userId)
    history.push('/resetpassword')
    
  }else{
    localStorage.removeItem("userId")
  }
  
      } catch (error) {
        console.log("Login Error", error)
      }
    }

    validatingUrl()

  }, [])

  return (
    <div className="urlVerificationDiv">
      {fetched ? message && <div className="message">{message}</div>

        :
        <Box sx={{ display: 'flex', justifyContent: "center", paddingTop: "10vh" }}>
          <CircularProgress color="error" size="50px" />
        </Box>}
    </div>
  )
}

export default Forgot