import React, { Component } from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/BuildController/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }
    componentDidMount(){
        console.log(this.props);
        /*axios.get(`https://react-my-burger-591cb-default-rtdb.firebaseio.com/ingredients.json`).then(response=>{
            this.setState({ingredients: response.data})
            
        }).catch(error=>{
            this.setState({error: true})
        });*/
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseHandler=()=>{
        this.setState({purchasing: true});
    }
    purchaseContinueHandler =()=>{
     /*   */
    const queryParams= [];
    for (let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+ '='+ encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString= queryParams.join('&');
    this.props.history.push({
        pathname:'/checkout',
        search:'?' + queryString
    });

    }


    updatePurchaseState (ingredients){
      
        const sum = Object.keys(ingredients)
        .map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el)=>{
            return sum+ el;
        },0)
          this.setState({purchasable: sum > 0})
    }
    

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const originalPrice = this.state.totalPrice;
        const addedPrice = INGREDIENT_PRICES[type];
        const updatedPrice= originalPrice + addedPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients)


    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];    
        if (oldCount <= 0){
                return;
            }
        
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const originalPrice = this.state.totalPrice;
        const deductedPrice = INGREDIENT_PRICES[type];
        const updatedPrice= originalPrice - deductedPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary= null;

        if (this.state.loading){
            orderSummary = <Spinner/>
        }
        let burger= this.state.error? <p>The site is under-going maintance we appolpgise for the inconvenience! will get back shortly!</p>: <Spinner/>
        if(this.state.ingredients){
        burger= (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded ={this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled ={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
            </Aux>
          );
          orderSummary=
           <OrderSummary ingredients ={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}></OrderSummary> 
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
mapStateToProps = state =>{
    return{

    }
}

mapActionToProps = state =>{
    return{
        
    }
}

export default withErrorHandler(BurgerBuilder, axios);