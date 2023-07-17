import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Box,styled,Divider} from "@mui/material"
import Conversation from './Conversation';
import {getUsers} from "../../Redux/users/userAction"
const Conversations = () => {
    const [user,setUser]=useState([]);
const Component=styled(Box)`
height:81vh;
overflow:overlay;
`
const StyledDivider=styled(Divider)`
margin:0 0 0 70px;
background:#e9edf;
opacity:.7,
`

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(getUsers())
},[])
   const alluser=useSelector((state)=>state.getuserReducer.Alluser);
//    const allData=()=>{}
    console.log("alluser",alluser)
  return (
    <Component>
    {/* {
        alluser.map(user=>{
            <>
            <Conversation user={user}/>
            <StyledDivider />
            </>
            
        })
    } */}

    </Component>
  )
}

export default Conversations
 