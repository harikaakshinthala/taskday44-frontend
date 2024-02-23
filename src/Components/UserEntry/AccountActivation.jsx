import { Box, Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './UserEntry.css'
import { useFormik } from 'formik'
import { Route, Switch, useHistory, useParams } from 'react-router-dom'

const AccountActivation = () => {

    return (
        <div className='userEntryDiv'>

            <Switch>
                <Route exact path='/activate'>
                    <EmailSending />
                </Route>
                <Route exact path='/activate/:id'>
                    <UrlVerification />
                </Route>
            </Switch>



        </div>
    )
}


// EMAIL SENDING PROCESS:

const EmailSending = () => {
    const [message, setMessage] = useState()
    const [click, setClick] = useState(false)

    // validates through formik
    const { handleSubmit, handleBlur, handleChange, values } = useFormik(
        {
            initialValues: {
                email: ""
            },
            onSubmit: (details) => {
                emailsending(details)
                setClick(true)
                setMessage()

            }
        }
    )

    // customer login

    const emailsending = async (details) => {

        try {
            // If the token already exists, this process will delete all tokens
            const deleteresponse = await fetch("https://taskday44-url-shortner.onrender.com/activate/delete", {
                method: "DELETE",
                body: JSON.stringify(details)
            })

            const deleteData = await deleteresponse.json()
            if (deleteData.message === "Successfully URL token deleted") {

                // sending email

                const emailresponse = await fetch("https://taskday44-url-shortner.onrender.com/activate", {
                    method: "POST",
                    body: JSON.stringify(details),
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                const emaildata = await emailresponse.json()

                setMessage(emaildata.message)
                setClick(false)
            } else {
                setMessage(deleteData.message)
                setClick(false)
            }

        } catch (error) {
            console.log("Login Error", error)
        }
    }
    return (
        <div className="formdiv">

            <form className='form' onSubmit={handleSubmit}>
                <div className="tittle">Activate</div>
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
                            "SEND EMAIL"
                    }
                </Button>

                <div className="links">
                    <a href="/login" style={{ textAlign: "center" }}>Account already activated</a>
                </div>

            </form>
        </div>
    )
}


// URL TOKEN VERIFICATION PROCESS:
const UrlVerification = () => {
    const history = useHistory()
    const [message, setMessage] = useState()
    const [fetched, setfetched] = useState(false)
    const params = useParams()

    useEffect(() => {
        const validation = async () => {

            try {

                const response = await fetch(`https://https://taskday44-url-shortner.onrender.com/verify/${params.id}`, {
                    method: "PUT",
                    body: JSON.stringify(),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await response.json()
                setfetched(true)
                setMessage(data.message)
               if(data.message === "Successfully Your Account Activated") history.replace("/login")

            } catch (error) {
                console.log("Login Error", error)
            }
        }

        validation()
    }, [])
    return (
        <div className="urlVerificationDiv">
            {fetched ? message && <div className="message">{message}</div>

                :
                <Box sx={{ display: 'flex', justifyContent: "center",paddingTop:"10vh" }}>
                    <CircularProgress color="error" size="50px" />
                </Box>}
        </div>
    )
}

export default AccountActivation