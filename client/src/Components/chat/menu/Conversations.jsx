import React, { useContext, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux';
import {Box,styled,Divider} from "@mui/material"
import Conversation from './Conversation';
import { AccountContext } from '../../context/AccountProvider';
// import { convertLength } from '@mui/material/styles/cssUtils';
const Conversations = ({text}) => {
    const [user,Alluser]=useState([])
const Component=styled(Box)`
height:81vh;
overflow:overlay;
`
const StyledDivider=styled(Divider)`
margin:0 0 0 70px;
background:#e9edf;
opacity:.7,
`
useEffect(()=>{
 fetchUser();
},[text])

const {setexistuser}=useContext(AccountContext)
let presentUser=useSelector((state)=>state.userReducer.user);

const fetchUser=async()=>{
  try {
    const response=await fetch('http://localhost:4500/getUser');
    if(response.ok){
      const result=await response.json()
      // return result
      console.log("existuser",result)
      const filterData=result.Alluser.filter((item)=>item.name.toLowerCase().includes(text.toLowerCase()))
      Alluser(filterData);
      setexistuser(result.Alluser)
    }
  } catch (error) {
    
  }
}

  return (
    <Component>
    {
        user.map((user)=>(
            user.email!==presentUser.email && <>
            <Conversation user={user}/>
            <StyledDivider />
            </>
            
        ))
    }

    </Component>
  )
}

export default Conversations
 