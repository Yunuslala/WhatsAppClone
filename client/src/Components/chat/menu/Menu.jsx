import React from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { SearchBar } from './SearchBar'

export const Menu = () => {
  return (
    <>
        <Box>
            <Header />
            <SearchBar />
        </Box>
    </>
  )
}
