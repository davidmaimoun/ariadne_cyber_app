import { Box, Typography, Grid } from '@mui/material'
import CategoryCard from '../components/CategoryCard'
import { useNavigate } from 'react-router-dom'


const ScanWeb = () => {
    const navigate = useNavigate()

    const cards = [
        { key: 'ssrf', title: 'SSRF', desc: 'Server-Side Request Forgery & bypass techniques' },
        { key: 'sql-injection', title: 'SQL Injection', desc: 'Classic, union-based, blind & time-based SQLi' },
        { key: 'xss', title: 'XSS', desc: 'Reflected, stored, DOM, CSP bypass' },
        { key: 'csrf', title: 'CSRF', desc: 'Cross-Site Request Forgery attacks' },
        { key: 'web-cache-deception', title: 'Web Cache Deception', desc: 'Cache poisoning & sensitive data exposure' },
        { key: 'open-redirect', title: 'Open Redirect', desc: 'Redirect exploits & phishing vectors' },
        { key: 'command-injection', title: 'Command Injection', desc: 'RCE via unsanitized system commands' },
        { key: 'path-traversal', title: 'Path Traversal', desc: 'Reading or writing unauthorized server files' },
        { key: 'file-inclusion', title: 'LFI / RFI', desc: 'Local & Remote File Inclusion vulnerabilities' },
        { key: 'deserialization', title: 'Deserialization', desc: 'Unsafe object parsing leading to RCE' },
        { key: 'websockets-security', title: 'WebSockets Security', desc: 'WS/WSS vulnerabilities & exploits' },
        { key: 'idor', title: 'IDOR', desc: 'Insecure Direct Object Reference' },
        { key: 'broken-auth', title: 'Broken Authentication', desc: 'Weak auth, session hijacking, logic flaws' },
        { key: 'api-security', title: 'Open API Security', desc: 'Swagger / API enumeration & exploitation' }
    ];



    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Web Security</Typography>
                {cards.map(c => <CategoryCard title={c.title} desc={c.desc} onStart={() => navigate(`${c.key}`)} /> )}
        </Box>
        )
}

export default ScanWeb