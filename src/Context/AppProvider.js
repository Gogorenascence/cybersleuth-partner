import React from "react";
import { DigimonQueryContextProvider } from "./DigimonQueryContext";


const AppProvider = ({ children }) => {
    return (
        <DigimonQueryContextProvider>
            {children}
        </DigimonQueryContextProvider>
    );
};

export default AppProvider;
