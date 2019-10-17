export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';


export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price ) => {
    return async dispatch =>  {
        // redux-thunk ..any async without disturbing the flow of redux action
        const response = await fetch('https://shoppingapprn.firebaseio.com/products.json', {
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

        const resData = await response.json(); // holds the object id created under 'name' key

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
    return { type: UPDATE_PRODUCT, pid: id, productData: {
        title,
        description,
        imageUrl,
        } 
    };
};