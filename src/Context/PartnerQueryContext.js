import { createContext, useState } from "react";


const PartnerQueryContext = createContext();

const PartnerQueryContextProvider = ({ children }) => {
    const [query, setQuery] = useState({
        digimonName: "",
        digimon_id: 0,
        neighbor: "",
        move: "",
    });
    const [sortState, setSortState] = useState("none");
    // const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);

    return (
        <PartnerQueryContext.Provider value={{
            query,
            setQuery,
            sortState,
            setSortState,
            showMore,
            setShowMore
            }}>
            {children}
        </PartnerQueryContext.Provider>
    );
};

export { PartnerQueryContext, PartnerQueryContextProvider };
