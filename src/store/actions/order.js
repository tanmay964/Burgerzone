import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData 
    }
}

export const burgerPurchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}
export const burgerPurchaseStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}


export const burgerPurchase = (orderData, token, userId) => {
    return dispatch => {
        dispatch(burgerPurchaseStart())
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                console.log(response.data)
                dispatch(burgerPurchaseSuccess(response.data.name, orderData))
            } )
            .catch( error => {
                dispatch(burgerPurchaseFailed(error))
            } );
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,

    }
}
export const fetchOrders = (token, userId) =>{
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'

        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            });
    } 
}