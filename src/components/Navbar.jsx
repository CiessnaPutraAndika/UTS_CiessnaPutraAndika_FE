import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }
  return (
    <div className='w-full drop-shadow-lg bg-blue-600'>
        <div className='max-w-[1200px] px-3 m-auto flex justify-between items-center py-3 drop-shadow-lg'>
          <p className='font-extrabold text-2xl text-white'>MANAGEMENT</p>

          <div className='lg:hidden md:hidden sm:hidden flex justify-center items-center'>
            <button onClick={toggleMenu}>
              <GiHamburgerMenu className='text-2xl'/>
            </button>
          </div>

          <ul className='hidden lg:flex md:flex gap-4 font-bold'>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to='/menu'>Menu</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/meja">Meja</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/customer">Customer</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/order">Order</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/payment">Payment</Link></li>
          </ul>        
        </div>

        {/* mobile menu */}
        {menuOpen ? (
          <div className='flex-col gap-3 ms-4 flex w-[150px]'>
            <ul className='flex-col lg:hidden md:hidden sm:hidden gap-2 font-bold flex'>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to='/menu'>Menu</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/meja">Meja</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/customer">Customer</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75'><Link to="/order">Order</Link></li>
            <li className='text-white hover:text-slate-200 ease-in-out duration-75 mb-4'><Link to="/payment">Payment</Link></li>
            </ul>            
          </div>
        ) : null}

    </div>
  )
}
