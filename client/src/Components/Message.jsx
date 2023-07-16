import React, { useContext } from 'react'
import { LoginDialog } from './account/LoginDialog'
import {AppBar,Toolbar,Box} from '@mui/material';
import AccountProvider, { AccountContext } from './context/AccountProvider';
import { ChatDialogs } from './chat/ChatDialogs';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux/es/hooks/useSelector';

export const Message = () => {
  console.log("data")
  const data=useSelector((state)=>state.userReducer.user)
  console.log("data",data)
  const header = { height:'200px',
  backgroundColor:'#00bfa5',
}

const loginHeader={ 
  height:'125px',
backgroundColor:'#00bfa5',
}


const component= {
  height:"100vh",
backgroundColor:"#DCDCDC"
}
return (
<Box style={component}>
{
false ? 
  <>
  <AppBar style={loginHeader}>
    <Toolbar>
    </Toolbar>
  </AppBar>
  <ChatDialogs />
  </>
  :
  <>
  <AppBar style={header}>
    <Toolbar>
        </Toolbar>
    </AppBar>
    <LoginDialog />
  </>
}
   
</Box>
)
}
