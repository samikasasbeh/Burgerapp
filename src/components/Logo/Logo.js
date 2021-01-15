import React from 'react';
import Logoimage from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, marginBottom:props.marginbottom}}>
        <img src={Logoimage} alt='Logo of Burger'></img>
    </div>
     
);

export default logo;