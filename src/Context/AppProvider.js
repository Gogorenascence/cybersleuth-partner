import React from "react";
import { DigimonQueryContextProvider } from "./DigimonQueryContext";
import { PartnerQueryContextProvider } from "./PartnerQueryContext";


const AppProvider = ({ children }) => {
    return (
        <PartnerQueryContextProvider>
            <DigimonQueryContextProvider>
                {children}
            </DigimonQueryContextProvider>
        </PartnerQueryContextProvider>
    );
};

export default AppProvider;
