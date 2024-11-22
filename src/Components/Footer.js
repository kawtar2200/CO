import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Footer.css'

export const Footer = () => {
  return (
    <div style={{backgroundColor: "rgb(79, 61, 39)",width:"100%", paddingBottom:"0px"}} className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='footer-col'>
            <h4>MerShop</h4>
            <ul>
              <li><a> about us</a></li>
              <li><a> our survice</a></li>
              <li><a>privacy policy</a></li>
              <li><a>affliliate program</a></li>
            </ul>

          </div>
          <div className='footer-col'>
            <h4>get help</h4>
            <ul>
              <li><a> FAQ</a></li>
              <li><a> shipping</a></li>
              <li><a>reture</a></li>
              <li><a>affliliate program</a></li>
            </ul>

          </div>
          <div className='footer-col  '>
            <h4>follow us</h4>
           <div className='social-links'>
            <a><FaFacebookF size={30} /></a>
            <a><FaInstagram size={30} /></a> 
            <a><FaTwitter size={30} /></a>
            <a><FaWhatsapp size={30} /></a>
           </div>
              
            

          </div>

        </div>
        </div> 
    </div>
  )
}
