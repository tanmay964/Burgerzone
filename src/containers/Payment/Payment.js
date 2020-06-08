import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom'
import braintree from 'braintree'
class Payment extends Component {
    state = {  }

    paymentCancelledHandler() {
        this.props.history.goBack();
    }
    paymentContinueHandler(){
        this.props.history.replace('/payment')
    }
    render() { 
        return ( <div>
            
        </div> );
    }
}
 
export default Payment;
