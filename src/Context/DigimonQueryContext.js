import { createContext, useState } from "react";


const DigimonQueryContext = createContext();

const DigimonQueryContextProvider = ({ children }) => {
    const [digiQuery, setDigiQuery] = useState({
        digimonName: "",
        digimon_id: 0,
        neighbor: "",
        move: "",
        stage: "",
    });
    const [sortState, setSortState] = useState("none");
    // const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);

    return (
        <DigimonQueryContext.Provider value={{
            digiQuery,
            setDigiQuery,
            sortState,
            setSortState,
            showMore,
            setShowMore,
            }}>
            {children}
        </DigimonQueryContext.Provider>
    );
};

export { DigimonQueryContext, DigimonQueryContextProvider };
