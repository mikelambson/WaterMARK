import React from 'react';
import './Navbar.css';
import { MenuList } from './MenuList';
import { NavLink } from 'react-router-dom';



const Navbar = () => {

        const menuList = MenuList.map(({url, title}, index) => {
            return (
                <li key={index}>
                    <NavLink exact to={url} activeClassName="active">{title}</NavLink>
                </li>
            );
        });
    return (
        <nav>
            <div className='logo'>
                <div className='wmtitle'><font>Water</font>MARK</div><div className='subtitle'>Meter Access Repository Kit</div>
              </div>
              <ul className='menu-list'>{menuList}</ul>
        </nav>
    );
}

export default Navbar;