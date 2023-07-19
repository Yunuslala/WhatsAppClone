import React, { useState } from 'react'
import {Box,styled} from "@mui/material"
import Footer from './Footer'
import { useSelector } from 'react-redux'


const MessageBox = ({chatheaderUser}) => {
  const Wrapper=styled(Box)`
  background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})
  `
const Component=styled(Box)`
height:80vh;
overflow-y:scroll;
`

  return (
    <Wrapper>
    <Component>

    </Component>
    <Footer
        chatheaderUser={chatheaderUser}
      />
    </Wrapper>
  )
}

export default MessageBox
