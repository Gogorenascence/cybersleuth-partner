import { createContext, useState } from "react";


const DigimonDataContext = createContext();

const DigimonDataContextProvider = ({ children }) => {
    let moves = require("./Database/digiMoves.json")
    let moveNames = require("./Database/moveNames.json")
    let digimonNames = require("./Database/digiNames.json")
    let neighbors = require("./Database/digiNeighbours.json")
    let fullDigimonList = []

    for (let [num, name] of Object.entries(digimonNames)) {
        const digimon = {
            name: name,
            digimon_id: num,
            neighbors: neighbors[num],
            moves: moves[num]? moves[num].map((moveNum) => moveNames[moveNum]): [],
        }
        fullDigimonList.push(digimon)
    }

    return (
        <DigimonDataContext.Provider value={{
            moves,
            moveNames,
            digimonNames,
            neighbors,
            fullDigimonList
            }}>
            {children}
        </DigimonDataContext.Provider>
    );
};

export { DigimonDataContext, DigimonDataContextProvider };
