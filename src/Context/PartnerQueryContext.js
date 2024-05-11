import { createContext, useState } from "react";


const PartnerQueryContext = createContext();

const PartnerQueryContextProvider = ({ children }) => {
    const [query, setQuery] = useState({
        partnerName: "",
        digimonName: "",
        move: "",
        stage: ""
    });

    const [sortState, setSortState] = useState("none");
    // const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);

    const resetQuery = () => {
        setQuery({
            partnerName: "",
            digimonName: "",
            move: "",
            stage: "",
        })
    }

    return (
        <PartnerQueryContext.Provider value={{
            query,
            setQuery,
            sortState,
            setSortState,
            showMore,
            setShowMore,
            resetQuery
            }}>
            {children}
        </PartnerQueryContext.Provider>
    );
};

export { PartnerQueryContext, PartnerQueryContextProvider };
