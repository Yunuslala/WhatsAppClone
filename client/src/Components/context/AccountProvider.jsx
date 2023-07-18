import {createContext, useState} from 'react'

export const AccountContext=createContext(null);


const AccountProvider=({children})=>{
    const [account,setAccount]=useState();
    const [relations,setrelations]=useState([]);
    const [existuser,setexistuser]=useState([])


    return(
        <AccountContext.Provider 
        value={{
            account,
            setAccount,
            relations,
            setrelations,
            existuser,
            setexistuser
        }}
        >
        {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider