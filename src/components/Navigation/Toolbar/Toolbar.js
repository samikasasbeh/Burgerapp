import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar =(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.click}/>
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
            <Navigationitems/>
        </nav>
    </header>
);
export default toolbar;