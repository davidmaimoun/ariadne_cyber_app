import { Box, Typography, Grid } from '@mui/material'
import CategoryCard from '../components/CategoryCard'
import { useNavigate } from 'react-router-dom'


const WebAuth = () => {
    const navigate = useNavigate()

    const cards = [
        { title: 'Authentications', 
            desc: 'Auth pitfalls and labs', 
            labs: [
                { 
                    key: 'auth_lab',
                    title: 'Password reset broken logic', 
                    desc: "Understand how to implement safe password reset flows." 
                },
                { 
                    key: 'rememberme_lab',
                    title: 'Keeping users logged in', 
                    desc: "How weak 'Remember me' cookies let attackers bypass login." 
                }
            ] 
        },
        { title: 'Web Cache Deception', desc: 'Intro and examples' },
        { title: 'Websocket', desc: 'Websocket security' },
        { title: 'SQL Injection', desc: 'SQLi basics' },
    ]

return (
    <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Web Security</Typography>
            {cards.map(c => (
                <>
                {
                    c.labs ? 
                    ( 
                        <>
                        <Typography variant="h5" sx={{ mb: 2 }}>{c.title}</Typography>
                        { 
                            c.labs?.map(l => (
                                <Grid key={l.title}>
                                    <CategoryCard 
                                        title={l.title} 
                                        desc={l.desc} 
                                        onStart={() => navigate(`${l.key}`, { state: { from: "reset-pwd" }})}
                                    />
                                </Grid>

                            ))
                        }
                        <br></br>
                        </>
                    )
                    :
                    <CategoryCard title={c.title} desc={c.desc} onStart={() => { /* open module */ }} />
                }
                </>
            ))}
    </Box>
    )
}

export default WebAuth