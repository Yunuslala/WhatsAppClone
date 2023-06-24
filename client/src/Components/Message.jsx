import React, { useContext } from 'react'
import { LoginDialog } from './account/LoginDialog'
import {AppBar,Toolbar,Box} from '@mui/material';
import AccountProvider, { AccountContext } from './context/AccountProvider';
import { ChatDialogs } from './chat/ChatDialogs';

export const Message = () => {
  const header = { height:'200px',
  backgroundColor:'#00bfa5',
}

const loginHeader={ 
  height:'125px',
backgroundColor:'#00bfa5',
}
const {account}=useContext(AccountContext)

const component= {
  height:"100vh",
backgroundColor:"#DCDCDC"
}
return (
<Box style={component}>
{
  account ? 
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
