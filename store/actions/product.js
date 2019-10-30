import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {

    return async dispatch =>  {
        // redux-thunk ..any async without disturbing the flow of redux action

        try {
            const response = await fetch(
                'https://shoppingapprn.firebaseio.com/products.json'
                );
            // 'aysnc','await' are alternative to 'then' in react native used to resolve promises returned
    
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json(); 

            const loadedProducts = [];
    
            for (const key in resData) {

                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                    )
                );
            }
    
            dispatch({ type: SET_PRODUCTS, products: loadedProducts });    
        }
        catch (err) {
            //send to custom analytics server
            throw err; 
            // rethrowing error to productsOverviewScreen
        }
        };
};


export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        // redux thunk allows us to get current snapshot of the redux store state
    const token = getState().auth.token;

      const response =  await fetch(
            `https://shoppingapprn.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
            method: 'DELETE',
        });  

    if(!response.ok) {
        throw new Error('Something went wrong!');
    }

        dispatch ({ type: DELETE_PRODUCT, pid: productId });
    };
};

export const createProduct = (title, description, imageUrl, price ) => {
    return async (dispatch, getState) => {
        // redux-thunk ..any async without disturbing the flow of redux action
        // redux thunk allows us to get current snapshot of the redux store state
        const token = getState().auth.token;
        const response = await fetch(
            `https://shoppingapprn.firebaseio.com/products.json?auth=${token}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        // 'aysnc','await' are alternative to 'then' in react native used to resolve promises returned

        const resData = await response.json(); 
        // holds the object id created under 'name' key

        dispatch({
            type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            } 
        });
    };
};

export const updateProduct = ( id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        // redux thunk allows us to get current snapshot of the redux store state
   const token = getState().auth.token;

   const response = await fetch(
            `https://shoppingapprn.firebaseio.com/products/${id}.json?auth=${token}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch ({ type: UPDATE_PRODUCT, pid: id, productData: {
            title,
            description,
            imageUrl,
            } 
        });
    }; // redux thunk syntax
};