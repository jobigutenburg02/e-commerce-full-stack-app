import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { Outlet } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

// MainLayout component provides the common layout structure for all pages, 
// including the navigation bar, toast notifications, main content area (outlet), and footer.
const MainLayout = ({numCartItems}) => {

  return (
    <>
      <NavBar numCartItems={numCartItems}/>
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout