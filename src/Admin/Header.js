import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import './admin.css'

function Header({OpenSidebar}) {
  return (
    <header className='headers'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <h1>MerShop.</h1>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon-r'/>
            <BsFillEnvelopeFill className='icon-r'/>
            <BsPersonCircle className='icon-r'/>
        </div>
    </header>
  )
}

export default Header