import {createContext, useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'
export const AccountContext=createContext(null);


const AccountProvider=({children})=>{
    const [account,setAccount]=useState();
    const [relations,setrelations]=useState([]);
    const [existuser,setexistuser]=useState([]);
    const [activeUser,SetActiveUser]=useState([]);


    const socketRef = useRef();
  
  
       

        useEffect(() => {
          socketRef.current = io('ws://localhost:9000');

        }, []);
 
    return(
        <AccountContext.Provider 
        value={{
            account,
            setAccount,
            relations,
            setrelations,
            existuser,
            setexistuser,
            socketRef,
            activeUser,
            SetActiveUser
        }}
        >
        {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider