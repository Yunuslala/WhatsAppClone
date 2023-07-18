import React, { useContext } from 'react'
import {Box} from "@mui/material"
import Chatheader from './Chatheader'
import MessageBox from './MessageBox'
import { AccountContext } from '../../context/AccountProvider'
const ChatBox = () => {
  const {relations}=useContext(AccountContext);
  const {existuser}=useContext(AccountContext);
  console.log(relations);
  console.log(existuser);
  const chatheaderUser=existuser.filter((item)=>item.id==relations.reciverId)
  return (
    <Box style={{height:'75vh'}}>
    <Chatheader chatheaderUser={chatheaderUser}/>
    <MessageBox />

    </Box>
  )
}

export default ChatBox
 