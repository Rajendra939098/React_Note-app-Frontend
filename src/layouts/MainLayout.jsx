import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '.../components/NavBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({searchText,handleSearchText}) => {
  return (
    <div>
        <NavBar searchText={searchText} handleSearchText={handleSearchText}/>
        <ToastContainer position="top-right" autoClose={3000} />
        <Outlet/>
    </div>
  )
}

export default MainLayout