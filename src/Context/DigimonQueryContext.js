import { createContext, useState } from "react";


const DigimonQueryContext = createContext();

const DigimonQueryContextProvider = ({ children }) => {
    const [query, setQuery] = useState({
        name: "",
        digimon_id: 0,
        neighbor: "",
        move: "",
    });
    const [sortState, setSortState] = useState("none");
    // const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);

    return (
        <DigimonQueryContext.Provider value={{
            query,
            setQuery,
            sortState,
            setSortState,
            showMore,
            setShowMore
            }}>
            {children}
        </DigimonQueryContext.Provider>
    );
};

export { DigimonQueryContext, DigimonQueryContextProvider };
