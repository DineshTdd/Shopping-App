export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhjUmxX7kThANn6UgQNyCwJn_hDTXQ7bs',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
            }
        );
    
        if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = 'Unusual Activity found! Try again later!';
            }
            throw new Error(message);
        }

    const resData = await response.json();

    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhjUmxX7kThANn6UgQNyCwJn_hDTXQ7bs',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
            }
        );
    
    if(!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if(errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid!';
        }
        throw new Error(message);
    }

    const resData = await response.json();
    dispatch({ type: LOGIN });
  };
};