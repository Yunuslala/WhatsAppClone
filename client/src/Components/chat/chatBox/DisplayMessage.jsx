import React from 'react'
import {Box,Typography,styled} from "@mui/material"
import { useSelector } from 'react-redux'
const SentMessageBox=styled(Box)`
background:#dcf8c6;
max-width:60%;
margin-left:auto;
padding:5px;
width:fit-content;
border-radius:10px;
display:flex;
word-break:break-word;
`
const ReciveMessageBox=styled(Box)`
background:##FFFFFF;
max-width:60%;
padding:5px;
width:fit-content;
border-radius:10px;
display:flex;
word-break:break-word;
`
const Text=styled(Typography)`
font-size:14px;
padding:0 25px 0 5px;
`

const Time=styled(Typography)`
font-size:10px;
color:#919191;
margin-top:6px;
word-break:keep-all;
margin-top:auto;
`
const DisplayMessage = () => {
    // const user=useSelector((state)=>state.useReducer.user)
  return (
    <Box>
      <Typography></Typography>
      <Typography></Typography>
    </Box>
  )
}

export default DisplayMessage
