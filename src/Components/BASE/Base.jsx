import { AppBar, Button, Toolbar, createTheme, makeStyles } from '@mui/material'
import React from 'react'
import './base.css'
//import { purple, red } from '@mui/material/colors'
import { useHistory } from 'react-router-dom'

// const materialUITheme = createTheme({
//     palette:{
//         primary:{
//             main:purple[500]
//         },
//         color:{
//             main:"rgb(107, 4, 2)"
//         }
        
//     }
// })

// const usetheme = makeStyles((materialUITheme) => ({

//     header:{
//         color:materialUITheme.color.main
//     }
// }))

const Base = ({ children,setUrlShortener }) => {
    const history = useHistory()

    const logoutFunction = () => {
        localStorage.removeItem("usertoken")
        localStorage.removeItem("userId")
        history.replace("/login")
    }
    


    return (
        <div>
            <AppBar position='static' style={{backgroundColor:"rgb(32, 101, 2)"}}>
                <Toolbar variant='dense'  style={{ display: "flex", flexDirection: "row-reverse", gap: "calc(10px + 3vw)" }}>
                    <Button onClick={logoutFunction} className='button' color='inherit' style={{ fontWeight: "bolder", fontSize: "calc(9px + 0.5vw)" }}>logout</Button>
                    <Button onClick={()=>setUrlShortener(true)} className='button' color='inherit' style={{ fontWeight: "bolder", fontSize: "calc(9px + 0.5vw)" }}>url shortener</Button>
                </Toolbar>

            </AppBar>
            <div>
                {children}
            </div>

        </div>
    )
}

export default Base