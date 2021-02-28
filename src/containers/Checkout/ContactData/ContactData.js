import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'; 
import Input from '../../../components/UI/Button/Button';
import {connect} from 'react-redux';



class ContactData extends Component{
    state={
        orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false 
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true
                     
                    },
                    valid: false,
                    touched: false 
                },
                country:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false 
                },
                email:{
                    elementType: 'input',
                    elementConfig:{
                        type:'email',
                        placeholder: 'E-mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false 
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig:{
                        options: [
                            {value: 'fastest', displayValue:'Fastest'},
                            {value: 'cheapest', displayValue:'Cheapest'}
                    ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
        },
        formIsValid: false,
        loading: false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props);
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;


        }

        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData: formData
           
        }
        axios.post('/orders.json', order)
        .then(response =>{
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error=>{
            this.setState({loading: false });
        })
        
    }
    checkValidity(value, rules){
        let isValid =true;
        if(!rules){
            return false;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minlength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedForm= { ...this.state.orderForm};
        const updatedElement={ ...updatedForm[inputIdentifier]};
        updatedElement.value= event.target.value;
        updatedElement.valid= this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched= true
        updatedForm[inputIdentifier]= updatedElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }
    

    render(){
        let formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                setup: this.state.orderForm[key]
            })
        }
        let form =(
            <form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement=>(
                <Input 
                key={formElement.id}
                elementType={formElement.setup.elementType} elementConfig={formElement.setup.elementConfig}
                value={formElement.setup.value}
                invalid={!formElement.setup.valid}
                shouldValidate={formElement.setup.validation}
                touched={formElement.setup.touched}
                changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                />
            ) )}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>

        </form>
        );
        if( this.state.loading){
            form= (
                <div className={classes.Loader}>Loading...</div>
            );
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
            

        );
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);