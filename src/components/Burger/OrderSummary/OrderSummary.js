import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[OrderSummary] will/update')
    }
    render(){
        const ingredientSummary= Object.keys(this.props.ingredients)
        .map((ingKey) => {
        return <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
            </li>
         } );
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicous burger with the following ingredients:</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
            <Button 
            clicked={this.props.purchaseCanceled}
            btnType={'Danger'}>Cancel</Button>
            <Button
            clicked={this.props.purchaseContinue}
            btnType={'Success'}>Continue</Button>
        </Aux>
        );
    }
};

export default OrderSummary;