import React, {createContext, useContext, useReducer, useState} from "react";

export const Context = createContext();
export const stateContext = createContext();

export const Globalstate = ({reducer, initialstate, children}) => {
    // A Provider is used for state mangement

    const [currentPage, setCurrentPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const allState = {currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn}

    return (
        <Context.Provider value={useReducer(reducer, initialstate)}>
            <stateContext.Provider value={allState}>
                {children}
            </stateContext.Provider>
        </Context.Provider>
    )
}

export const useGlobalState = () => useContext(Context)