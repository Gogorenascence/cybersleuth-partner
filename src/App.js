import './App.css';
import PixelBack from './Display/PixelBack';
import AppProvider from "./Context/AppProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import DigimonList from './Digimon/DigimonList';


function App() {

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
    <AppProvider>
      <BrowserRouter>
      <div className="App">
        {/* <PixelBack/> */}
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/digilist" element={<DigimonList
            moves={moves}
            moveNames={moveNames}
            digimonNames={digimonNames}
            neighbors={neighbors}
            fullDigimonList={fullDigimonList}
            />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
