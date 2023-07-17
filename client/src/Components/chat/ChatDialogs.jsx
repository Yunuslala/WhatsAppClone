import React from 'react'
import {Dialog,Box} from '@mui/material'
import { Menu} from './menu/Menu'
import { EmptyChat } from './chatBox/EmptyChat'
import ChatBox from './chatBox/ChatBox'
export const ChatDialogs = () => {

    const  dialogStyle={
        height:'95%',
        width:'100%',
        marginTop:'20px',
        maxWidth:'100%',
        maxHeight:'100%',
        boxShadow:'none',
        overflow:'hidden',
        borderRadius:0
      }
      const MenuBoxStyle={
        minWidth:'450px'
      }
      const EmptyBoxStyle={
        width:'73%',
        minWidth:'300px',
        height:'100%',
        borderLeft:'1px solid rgba(0,0,0,0.14)'
      }
  return (
    <Dialog  open={true}
    PaperProps={{sx:dialogStyle}}
    hideBackdrop={true}
    >
    <Box style={{display:'flex'}}>
      <Box style={MenuBoxStyle}>
        <Menu />
      </Box>
      <Box style={EmptyBoxStyle}>
      <ChatBox />
        {/* <EmptyChat /> */}
      </Box>
    </Box>
    </Dialog>
  )
}
