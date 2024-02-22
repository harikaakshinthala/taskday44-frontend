import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {decodeToken} from 'react-jwt'

const ResetPassword = () => {

  const [message, setMessage] = useState()
  const [click, setClick] = useState(false)
  const [userId, setUserId] = useState()
  const history = useHistory()


  useEffect(() => {

    const getUrls = async () => {

      // getting token from header
      const token = localStorage.getItem("usertoken")

      // validating the header token
      const user = decodeToken(token)

      if (user) {
        history.replace("/")
      }

    }

    getUrls()

    //  Getting the user id
    const Id = localStorage.getItem("userId")
    setUserId(Id)
    if (!Id) {
      history.replace("/forgot")
    }




  }, [])

  // validates through formik
  const { handleSubmit, handleBlur, handleChange, values } = useFormik(
    {
      initialValues: {
        password: ""
      },
      onSubmit: (details) => {
        resetFunction(details)
        setClick(true)
        setMessage()

      }
    }
  )

  // customer login

  const resetFunction = async (details) => {

    try {
      const response = await fetch(`https://taskday44-url-shortner.onrender.com/forgot/reset/${userId}`, {
        method: "PUT",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json"
        }

      })
      const data = await response.json()

      setMessage(data.message)
      setClick(false)
      if (data.message === "Successfully password changed") {
        localStorage.removeItem("userId")
        history.push("/login")
      }

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


export default ResetPassword