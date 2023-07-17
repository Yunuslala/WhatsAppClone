import React from 'react'
import {Box,Typography,styled} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Chatheader = () => {
  return (
    <Box>
    <Box>
    <Typography>Name</Typography>
    <Typography>Online Status</Typography>
    </Box>
    <Box>
    <SearchIcon />
    <MoreVertIcon />
    </Box>
    </Box>
  )
}

export default Chatheader
