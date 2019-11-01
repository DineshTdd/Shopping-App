import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS= 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState )=> {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://shoppingapprn.firebaseio.com/orders/${userId}.json`
                );
            // 'aysnc','await' are alternative to 'then' in react native used to resolve promises returned
    
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json(); 

            const loadedOrders = [];
    
            for (const key in resData) {
                console.log(resData[key].date)
                console.log(new Date(resData[key].date).toISOString())
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date).toISOString()
                        // date string is converted back to date object
                    )
                );
            }
    
            dispatch({type: SET_ORDERS, orders: loadedOrders});
        } catch (err) {
            //send to custom analytics server
            throw err; 
            // rethrowing error to productsOverviewScreen
        }
    };
};

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        // redux thunk allows us to get current snapshot of the redux store state
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(
            `https://shoppingapprn.firebaseio.com/orders/${userId}.json?auth=${token}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });
        // 'aysnc','await' are alternative to 'then' in react native used to resolve promises returned

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch ({
            type: ADD_ORDER, 
            orderData: { 
                id: resData.name, 
                items: cartItems, 
                amount: totalAmount, 
                date: date
            }
        });
    };

};