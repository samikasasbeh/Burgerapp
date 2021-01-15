import React, {Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children!== this.props.children;
    }
    componentWillUpdate(){
        console.log('[modal] will update')
    }
    render(){
        return(
        <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
    <div className={`${classes.Modal} ${!this.props.show ? classes.ModalHidden: ''}`}
          >
        {this.props.children}
    </div>
    </Aux>
        );
    }
}
export default Modal;