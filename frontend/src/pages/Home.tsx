import { Box, Typography, Grid, Divider } from '@mui/material'
import CategoryCard from '../components/CategoryCard'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const scans = [
    { 
        key: 'scan_web', 
        title: 'Web Application', 
        desc: 'Scan des vulnérabilités web telles que XSS, SQLi, SSRF, CSRF, IDOR, directory traversal, etc.' 
    },
    { 
        key: 'scan_network', 
        title: 'Network', 
        desc: 'Analyse de ports, services, fingerprinting, détection de versions, et audit de configuration réseau.' 
    },
];

    const categories = [
        { key: 'linux', title: 'Linux', desc: 'Linux topics and priv-esc' },
        { key: 'windows', title: 'Windows', desc: 'Windows topics & AD' },
        { key: 'ad', title: 'Active Directory', desc: 'AD lab guides' },
        { key: 'web', title: 'Web', desc: 'Web security topics' }
    ]

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Scan</Typography>
            <Grid container spacing={2}>
                {scans.map(s => (
                    <Grid key={s.key} >
                        <CategoryCard title={s.title} desc={s.desc} onStart={() => navigate(`/${s.key}`)} />
                    </Grid>
                ))}
            </Grid>
            <Divider/>
            <Typography variant="h4" sx={{ mb: 2 }}>Learning</Typography>
            <Grid container spacing={2}>
                {categories.map(c => (
                    <Grid key={c.key} >
                        <CategoryCard title={c.title} desc={c.desc} onStart={() => navigate(`/${c.key}`)} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Home