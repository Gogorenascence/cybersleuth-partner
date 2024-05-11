import './App.css';
import PixelBack from './Display/PixelBack';
import AppProvider from "./Context/AppProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import DigimonList from './Digimon/DigimonList';
import DigimonDetail from './Digimon/DigimonDetail';
import PartnerCreate from './Partners/PartnerCreate';
import PartnersList from './Partners/PartnersList';
import PartnerDetail from './Partners/PartnerDetail';
import PartnerEdit from './Partners/PartnerEdit';
import NavBar from './FBANavBar';


function App() {

  let moves = require("./Database/digiMoves.json")
  let moveNames = require("./Database/moveNames.json")
  let digimonNames = require("./Database/digiNames.json")
  let neighbors = require("./Database/digiNeighbours.json")
  let imageData = require("./Database/imageData.json")
  let fullDigimonList = []

  for (let [num, name] of Object.entries(digimonNames)) {
    const digimon = {
      name: name,
      id: num,
      neighbors: neighbors[num] ?? {prev: [], next: []},
      moves: moves[num]? moves[num].map((moveNum) => moveNames[moveNum]): [],
      stage: "",
      imageData: imageData[num],
    }
    if (num < 6) {
      digimon["stage"] = {name: "Training 1", level: 1}
    } else if (num < 17 || num == 250) {
      digimon["stage"] = {name: "Training 2", level: 2}
    } else if (num < 55 || (num > 250 && num < 260 ) || num == 328 || num == 329 || num == 337) {
      digimon["stage"] = {name: "Rookie", level: 3}
    } else if (num < 109 || (num > 259 && num < 282 ) || num == 330 || num == 331 || num == 338) {
      digimon["stage"] = {name: "Champion", level: 4}
    } else if (num < 167 || num == 339 || (num > 281 && num < 301 )) {
      digimon["stage"] = {name: "Ultimate", level: 5}
    } else if (num < 246 || (num > 300 && num < 320 ) ||num == 331 || (num > 331 && num < 337) ||num == 340) {
      digimon["stage"] = {name: "Mega", level: 6}
    } else if (num < 322 || (num > 319 && num < 326 ) || num == 332 || num == 341) {
      digimon["stage"] = {name: "Ultra", level: 7}
    } else if (num < 326) {
      digimon["stage"] = {name: "Armor", level: 4}
    } else if (num < 328) {
      digimon["stage"] = {name: "-", level: 8}
    }
    fullDigimonList.push(digimon)
  }

  return (
    <AppProvider>
      <BrowserRouter>
      <NavBar/>
      <div className="App margin-bottom-20p">
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
          <Route path="/digimon/:digimon_id" element={<DigimonDetail
            fullDigimonList={fullDigimonList}
            />}
          />
          <Route path="/partnercreate" element={<PartnerCreate
            fullDigimonList={fullDigimonList}
            moveNames={moveNames}
            digimonNames={digimonNames}
            />}
          />
          <Route path="/partners" element={<PartnersList
            fullDigimonList={fullDigimonList}
            moveNames={moveNames}
            />}
          />
          <Route path="/partner/:partner_id" element={<PartnerDetail
            fullDigimonList={fullDigimonList}
            digimonNames={digimonNames}
            />}
          />
          <Route path="/partner/:partner_id/edit" element={<PartnerEdit
            fullDigimonList={fullDigimonList}
            moveNames={moveNames}
            digimonNames={digimonNames}
            />}
          />
        </Routes>
        <br/>
        <br/>
      </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
