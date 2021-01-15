import React from 'react';
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import Classes from './CheckoutSummary.css';

const checkoutSummary =(props)=>{
    return(
        <div className={Classes.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style={{width:'100%', height:'300px', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>

        </div>
    );
}
export default checkoutSummary;