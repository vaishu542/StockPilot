import React from 'react'
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div className=''>
            <nav className='flex flex-col gap-4 md:flex-row items-center justify-between mx-6'>
                <div className="logo">
                    <img src={logo} alt="logo" className='object-cover w-32  ' />
                </div>
                <div className="list ">
                    <ul className='flex gap-6 text-lg'>
                        <li onClick={() => navigate('/')} className='cursor-pointer' >Home</li>
                        <li onClick={() => navigate('/about')} className='cursor-pointer' >About</li>
                        <li onClick={() => navigate('/inventory')} className='cursor-pointer' >Inventory</li>
                        <li onClick={() => navigate('/contact')} className='cursor-pointer' >Contact</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar