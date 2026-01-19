// Footer.js

import React from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  const designedRender = () => {
    return (
      <footer className='footer w-full h-40'>
        <div className='inline-flex items-center gap-2'>
          {/* <div className=" w-10 h-10 overflow-hidden rounded-full">
            <img src={logo} alt="프리미티브 로고" className="grayscale" />
          </div> */}
        </div>
        <div className='flex justify-center items-center gap-2'>
          <a
            href='https://www.instagram.com/primitive_knu/'
            target='_blank'
            className='text-gray-300 hover:text-gray-600'
            rel='noreferrer'
          >
            <i className='fab'>
              <FaInstagram style={{ width: 24 + 'px', height: 24 + 'px' }} />
            </i>
          </a>
          <a
            href='https://github.com/ShipFriend0516/Primitive'
            target='_blank'
            className='text-gray-300 hover:text-gray-600'
            rel='noreferrer'
          >
            <i className='fab'>
              <FaGithub style={{ width: 24 + 'px', height: 24 + 'px' }} />
            </i>
          </a>

          <Link className='text-gray-300 hover:text-gray-600' to={'/notice'}>
            <FaCircleInfo style={{ width: 24 + 'px', height: 24 + 'px' }} />
          </Link>
        </div>
        <hr className='w-4/5 inset-2 h-2 border-gray-300' />
        <p className='text-center relative text-sm'>
          © {new Date().getFullYear()} Primitive. All rights reserved.{' '}
          <span className='absolute right-0 text-gray-800 text-xs hidden md:block text-transparent'>
            Special Thanks.... Yungang
          </span>
        </p>
      </footer>
    );
  };
  return designedRender();
};

export default Footer;
