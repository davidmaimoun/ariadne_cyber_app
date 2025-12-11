import './App.css'
import 'react-toastify/dist/ReactToastify.css'; 
import { Container } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout'
import AppRoutes from './AppRoutes.tsx'

export default function App() {
  return (
    <Container maxWidth="xl" disableGutters>
      <ToastContainer/>
      <Layout>
        <AppRoutes />
      </Layout>
    </Container>
  )
}