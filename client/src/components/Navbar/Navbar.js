import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuList } from './MenuList';
import './Navbar.css';

const Navbar = () => {
        const [clicked, setClicked] = useState(false);
        const menuList = MenuList.map(({url, title}, index) => {
            return (
                <li key={index}>
                    <NavLink exact to={url} activeClassName='active'>
                        {title}
                    </NavLink>
                </li>
            );
        });

        return (
        <nav>
            <div className='logo'>
                <div className='wmtitle'>
                    <font>Water</font>MARK
                </div>
                <div className='subtitle'>
                        Meter Access Repository Kit
                </div>
            </div>
            <div className='menu-icon'>
                <i className='fa fa-bars'></i>
            </div>
            <ul className='menu-list'>{menuList}</ul>
        </nav>
    );
};

export default Navbar;