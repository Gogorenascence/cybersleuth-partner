import { createContext, useState } from "react";


const PartnerQueryContext = createContext();

const PartnerQueryContextProvider = ({ children }) => {
    const [partners, setPartners] = useState([])

    const [query, setQuery] = useState({
        partnerName: "",
        digimonName: "",
        wantedEvoName: "",
        move: "",
        stage: ""
    });

    const [sortState, setSortState] = useState("none");
    // const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);
    const [refresh, setRefresh] = useState(false)
    // const resetQuery = () => {
    //     setQuery({
    //         partnerName: "",
    //         digimonName: "",
    //         wantedEvoName: "",
    //         move: "",
    //         stage: "",
    //     })
    // }

    return (
        <PartnerQueryContext.Provider value={{
            partners,
            setPartners,
            query,
            setQuery,
            sortState,
            setSortState,
            showMore,
            setShowMore,
            refresh,
            setRefresh
            // resetQuery
            }}>
            {children}
        </PartnerQueryContext.Provider>
    );
};

export { PartnerQueryContext, PartnerQueryContextProvider };
