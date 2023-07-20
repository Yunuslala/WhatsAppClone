import { useContext, useEffect, useState } from 'react';
import { userReducer } from '../../Redux/auth/reducer'
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { useSelector } from 'react-redux';
import { AccountContext } from '../../context/AccountProvider';
import {currentDate,currentTime} from "../../constants/dateAndTime"
// import { uploadFile } from '../../../service/api';
import {getConversations} from "../../service/api"
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
   const [text,settext]=useState("");
   const [flag,setflag]=useState(false);
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

    useEffect(()=>{
        const getMessage=async()=>{
            const ans=await getConversations(relations.id);
            console.log("messagefromdb",ans)
        }
        getMessage()
    },[relations.id,flag])
    const SendText=async(e)=>{
      if(e.key=="Enter"){
        const date=currentDate();
        console.log(date);
        const time=currentTime();
        console.log(time)
        console.log(senderID,receiverId,text,"id",relations.id)
        console.log(e.key)
        const obj={
          text:text,
          textId:senderID,
          conversationsID:relations.id,
          type:"text",
          date,
          time,
        }
        settext("");
        console.log("objectofcreate conversations",obj)
        const response=await fetch('http://localhost:4500/createConversations',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
          });
          if(response.ok){
            const result=await response.json();
            console.log("conversationsMade",result)
            setflag((prevstate)=>!prevstate)
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