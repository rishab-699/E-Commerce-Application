import React, { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducers";

const INITIAL_STATE = {
    user: localStorage.getItem("userAccess") ? JSON.parse(localStorage.getItem("userAccess")) : null,
    isFetching: false,
    error: false
}

export const Context = createContext(INITIAL_STATE);

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("userAccess", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
