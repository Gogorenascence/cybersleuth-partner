import React from "react";
import { DigimonQueryContextProvider } from "./DigimonQueryContext";
import { PartnerQueryContextProvider } from "./PartnerQueryContext";
import { AuthContextProvider } from "./AuthContext";


const AppProvider = ({ children }) => {
    return (
        <PartnerQueryContextProvider>
            <DigimonQueryContextProvider>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </DigimonQueryContextProvider>
        </PartnerQueryContextProvider>
    );
};

export default AppProvider;
