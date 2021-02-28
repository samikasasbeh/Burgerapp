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
import * as burgerBuilderActions from '../../store/actions/index.js'



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
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
    this.props.history.push('/checkout');

    }


    updatePurchaseState (ingredients){
      
        const sum = Object.keys(ingredients)
        .map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el)=>{
            return sum+ el;
        },0)
          return sum > 0;
    }
    

    
    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary= null;

        if (this.state.loading){
            orderSummary = <Spinner/>
        }
        let burger= this.state.error? <p>The site is under-going maintance we appolpgise for the inconvenience! will get back shortly!</p>: <Spinner/>
        if(this.props.ings){
        burger= (
            <Aux>
            <Burger ingredients={this.props.ings} />
                <BuildControls
                ingredientAdded ={this.props.onIngredientAdd}
                ingredientRemoved = {this.props.onIngredientRemove}
                disabled ={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price}/>
            </Aux>
          );
          orderSummary=
           <OrderSummary ingredients ={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.props.price}></OrderSummary> 
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
const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdd :(ingName)=> dispatch(burgerBuilderActions.addIngrendient(ingName)),
        onIngredientRemove :(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));