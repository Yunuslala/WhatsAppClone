import React from 'react'
import {Box,InputBase,styled} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
export const SearchBar = ({settext}) => {
    const Component=styled(Box)`
    background:#fff;
    height:45px;
    border-bottom:1px solid #F2F2F2;
    display:flex;
    align-item:center;
    `
    const Wrapper = styled(Box)`
    background-color:#f0f2f5;
    position:relative;
    margin:0 13px;
    width:100%;
    border-radius:10px;
    `
    const Icon = styled(Box)`
    position:absolute;
    height:100%;
    padding:8px;
    color:#919191;
    `

    const InputField = styled(InputBase)`
    width:100%;
    padding:16px;
    padding-left:65px;
    height:15px;
    font-size:14px;
    `
  return (
    <Component>
    <Wrapper>
        <Icon>
            <SearchIcon 
                fontSize='small'
            />
        </Icon>
        <InputField placeholder='Search for new chat'
          onChange={(e)=>settext(e.target.value)}
        />
    </Wrapper>
    </Component>
  )
}
