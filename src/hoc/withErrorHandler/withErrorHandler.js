import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';


const withErrorHandler = (WrappedCompoenet, axios)=>{
     return class extends Component{
         state={
             error: null
         }
         componentWillMount(){
             this.reqInterceptors= axios.interceptors.request.use(request => {
                 this.setState({error: null});
                 return request;
             });
            this.resInterceptors= axios.interceptors.response.use(res=> res, error => {
                this.setState({error: error});
            });
         }
         componentWillUnmount(){
             axios.interceptors.request.eject(this.reqInterceptors);
             axios.interceptors.response.eject(this.resInterceptors);

         }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
       render() {
           return(
            <Aux>
              <Modal show={this.state.error}
              clicked={this.errorConfirmedHandler}>
                {this.state.error ? this.state.error.message: null}
              </Modal>
              <WrappedCompoenet {...this.props}/>
          </Aux>  
           );

       } 
    } 
}
export default withErrorHandler;