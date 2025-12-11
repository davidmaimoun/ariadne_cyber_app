import React, { type ReactNode } from 'react'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import LeftSidebar from './LeftSidebar.tsx'
import RightSidebar from './RightSidebar.tsx'

interface LayoutProps {
  children: ReactNode; // <- typage des enfants
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',  }}>
        <AppBar position="static" sx={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6">Ariadne Cyber Thread</Typography>
            </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flex: 1, mt: 2 }}>
            <Box sx={{ width: '1%', pr: 1 }}>
                <LeftSidebar />
            </Box>

            <Box sx={{ flex: 1, px: 2 }}>{children}</Box>

            <Box sx={{ width: '1%', pl: 1 }}>
                <RightSidebar />
            </Box>
        </Box>
    </Box>
    )
}

export default Layout