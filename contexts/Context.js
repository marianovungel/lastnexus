import { createContext, useReducer, useEffect, useState } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }, [state.user, isClient]);

    return (
        <Context.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
            {children}
        </Context.Provider>
    );
};
