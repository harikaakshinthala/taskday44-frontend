import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import './Url.css'

const Url = ({ id, setUrlShortener, allUrls, setAllUrls }) => {
    const [message, setMessage] = useState()
    const [click, setClick] = useState(false)

    // validates through formik
    const { handleSubmit, handleBlur, handleChange, values } = useFormik(
        {
            initialValues: {
                longUrl: ""
            },
            onSubmit: (details) => {
                urlShorteningFunction(details)
                setClick(true)
                setMessage()
                

            }
        }
    )

    // URL shortening

    const urlShorteningFunction = async (details) => {

        try {
            const response = await fetch(`https://taskday44-url-shortner.onrender.com/shorturl/${id}`, {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "user-login-token":localStorage.getItem("usertoken"),
                    "Content-Type": "application/json"
                }

            })
            const data = await response.json()

            setMessage(data.message)
            setClick(false)
            values.longUrl=""
           if(!data.message) {
            setAllUrls([...allUrls, data])
            setUrlShortener(false)
           } 
        } catch (error) {
            console.log("Shortener Error", error)
        }
    }

    return (
        <div className='shorturlDiv'>
            <form className='form' onSubmit={handleSubmit}>
            <div className="tittle">SHORTEN YOUR URL</div>
            {
                message && <div className="message">{message}</div>
            }
            <TextField
                required
                label="LONG URL"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.longUrl}
                name="longUrl"
            />

            {
                click ?
                    <Button variant='contained' color='success'>
                        <Box sx={{ display: 'flex', justifyContent: "center" }}>
                            <CircularProgress color="inherit" size="24.8px" />
                        </Box>
                    </Button>
                    :
                    <div style={{ display: "flex", gap: "calc(3px + 1vw)" }}>
                        <Button style={{ flex: "1" }} type='submit' variant='contained' color='success'>

                            CLICK
                        </Button>
                        <Button style={{ flex: "1" }} onClick={() => setUrlShortener(false)} variant='contained' color='error'>

                            CANCELL
                        </Button>
                    </div>
            }
        </form>
        </div>
    )
}

export default Url