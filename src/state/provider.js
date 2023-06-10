import React, {createContext, useContext, useReducer, useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import toast from "react-hot-toast";

export const Context = createContext();
export const stateContext = createContext();

export const Globalstate = ({reducer, initialstate, children}) => {

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