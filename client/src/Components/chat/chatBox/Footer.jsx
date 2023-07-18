import React from 'react';
import {Box,InputBase,styled} from "@mui/material";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
const Footer = () => {
    const Container=styled(Box)`
    height:55px;
    width:100%;
    display:flex;
    align-items:center;
    background:#ededed;
    padding:0 25px;
    & > * {
        margin:5px;
        color:#919191;
    }

    `
    const Search=styled(Box)`
    background-color:#FFFFFF;
    border-radius:18px;
    width:calc(94% - 100px);
    `
    const InputField=styled(InputBase)`
    width:100%;
    padding:20px;
    height:20px;
    padding-left:25px;
    font-size:14px;
    `
    const ClipIcon=styled(AttachFileIcon)`
    transform:rotate(40deg)
    `
  return (
    <Container>
      <EmojiEmotionsOutlinedIcon />
      <ClipIcon />
      <Search>
        <InputField
        placeholder='type a message'
         />
      </Search>
      <MicIcon />
    </Container>
  )
}

export default Footer
