import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WebAuth from './pages/AuthPage'
import ResetPwdPage from './labs/AuthLab'
import ScanWeb from './pages/ScanWeb'
import ScanSSRF from './scan/web/ScanSSRF'


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="scan_web" element={<ScanWeb />} />
            <Route path="scan_web/ssrf" element={<ScanSSRF />} />
            <Route path="/web" element={<WebAuth />} />
            <Route path="/web/auth_lab" element={<ResetPwdPage />} />
        </Routes>
    )
}