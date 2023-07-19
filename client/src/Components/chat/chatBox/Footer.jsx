import { useContext, useEffect, useState } from 'react';
import { userReducer } from '../../Redux/auth/reducer'
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { useSelector } from 'react-redux';
import { AccountContext } from '../../context/AccountProvider';

// import { uploadFile } from '../../../service/api';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;


const Footer = ({chatheaderUser}) => {
  const {relations}=useContext(AccountContext);
  console.log("footerrelations",relations)
   const [text,settext]=useState("")
   const user=useSelector((state)=>state.userReducer.user);
const senderID=user.id;
const receiverId=chatheaderUser[0].id;

    // useEffect(() => {
    //     const getImage = async () => {
    //         if (file) {
    //             const data = new FormData();
    //             data.append("name", file.name);
    //             data.append("file", file);

    //             const response = await uploadFile(data);
    //             setImage(response.data);
    //         }
    //     }
    //     getImage();
    // }, [file])

    // const onFileChange = (e) => {
    //     setValue(e.target.files[0].name);
    //     setFile(e.target.files[0]);
    // }
    const SendText=(e)=>{
      if(e.key=="Enter"){
        let date=new Date();
        console.log(date.toLocaleTimeString())
        console.log("helo")
        console.log(senderID,receiverId,text,"id",relations.id)
        console.log(e.key)
        const obj={
          text:text,
          textId:senderID,
          conversationsId:relations.id,
          
        }
      }
  
    }
    return (
        <Container>
            <EmojiEmotions /> 
                <ClipIcon />
            {/* <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            /> */}

            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => settext(e.target.value)}
                    onKeyDown={(e) => SendText(e)}
                    value={text}
                />
            </Search>
            <Mic />
        </Container>
    )
}

export default Footer;