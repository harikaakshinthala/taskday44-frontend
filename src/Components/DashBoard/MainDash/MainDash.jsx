import { Box, Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt'
import { Route, Switch, useHistory } from 'react-router-dom'
import Base from '../../BASE/Base'
import Url from '../UrlShortening/Url'
import './MainDash.css'

const MainDash = () => {
    const [allUrls, setAllUrls] = useState([])
    const [fetched, setFetched] = useState(false)
    const [shortenerClicked, setUrlShortener] = useState(false)
    const [id, setId] = useState()

    const history = useHistory()



    // useEffect:

    useEffect(() => {

        // user token cheking process
        const getShortenedUrls = async () => {
            // getting token from header
            const token = localStorage.getItem("usertoken")
            // replace to login 
            if (!token) return history.replace("/login")
            // validating the header token
            const user = decodeToken(token)
            // if header token is wrong then it will replace to login page and also remove the header token
            if (!user) {
                localStorage.removeItem("usertoken")
                history.replace("/login")
            } else {
                setId(user.id)
            }



            // getting the urls

            try {
                const response = await fetch(`https://taskday44-url-shortner.onrender.com/shorturl/all/${user.id}`, {
                    method: "GET",
                    headers: {
                        "user-login-token": localStorage.getItem("usertoken")
                    }
                })
                const data = await response.json()

                // If the urls in backend
                if (!data.message) {
                    setAllUrls(data)
                } else {

                    setUrlShortener(true)

                }

                setFetched(true)

            } catch (error) {
                console.log("All Url Error", error)
                setFetched(true)
            }
        }



        getShortenedUrls()

    }, [])
    return (
        <div>
            {/* main dash component */}
            {fetched ? <Home
                allUrls={allUrls}
                setAllUrls={setAllUrls}
                shortenerClicked={shortenerClicked}
                setUrlShortener={setUrlShortener}
                id={id}
            />


                :
                // fetching progress
                <Box sx={{ display: 'flex', justifyContent: "center", height: "100vh", alignItems: "center" }}>
                    <CircularProgress color="primary" size="50px" />
                </Box>}


        </div>
    )
}

export default MainDash

// 
const Home = ({ id, shortenerClicked, setUrlShortener, allUrls, setAllUrls }) => {

    return (
        <Base
            setUrlShortener={setUrlShortener}
        >

            {shortenerClicked ? <Url
                id={id}
                setUrlShortener={setUrlShortener}
                allUrls={allUrls}
                setAllUrls={setAllUrls}
            />

                : <div>
                    <AllURLs
                        allUrls={allUrls}
                        setAllUrls={setAllUrls}
                    />
                </div>
            }

        </Base>
    )
}



const AllURLs = ({ allUrls, setAllUrls }) => {
    


    return (
        <div className='cardDiv'>

            {allUrls.map((urls,index)=>{
                return(
                <CardComponent
                key={index}
                clicks={urls.clicks}
                shortenedUrl={urls.shortenedUrl}
                id={urls._id}
                allUrls={allUrls}
                setAllUrls={setAllUrls}

                />
                )
            })}
            </div>
    )
}


const CardComponent = ({id,shortenedUrl,clicks,setAllUrls,allUrls}) => {
    const [clicked, setClicked] = useState(false)
    const handleDelete = async (id) => {
        setClicked(true)
        try {
            const response = await fetch(`https://taskday44-url-shortner.onrender.com/shorturl/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "user-login-token": localStorage.getItem("usertoken")
                }
            })

            const data = await response.json()

            const deleteUrl = allUrls.filter((urls) => urls._id !== id)
            setClicked(false)
            setAllUrls(deleteUrl)

        } catch (error) {
            console.log("delete function error", error)
        }
    }
    
    return(

         <Card  className='urlCard' sx={{ width: "calc(100px + 10vw)", backgroundColor: "rgb(215, 253, 234)", boxShadow: "0 0 calc(3px + 1vw) green", borderRadius: "calc(5px + 0.5vw)" }}>
                        <CardContent>

                            <Typography component="div">
                                CLICKS : {clicks}
                            </Typography>
                            <Typography variant="body2">
                                <span> SHORT URL :</span> <a href={shortenedUrl}>{shortenedUrl}</a>
                            </Typography>
                        </CardContent>
                        <CardActions>

                            {/* fetching progress */}
                            {
                                clicked ?
                                    <Button variant='contained' color='error' style={{ width: "200px" }} >
                                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                            <CircularProgress color="inherit" size="calc(20px + 1vw)" />
                                        </Box>
                                    </Button>
                                    :
                                    <Button onClick={() => { handleDelete(id) }} variant='contained' color='error' style={{ width: "200px" }}>delete</Button>
                            }

                        </CardActions>
                    </Card>
    )
}