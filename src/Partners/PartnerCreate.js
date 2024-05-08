import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import helper from '../Helper';


function PartnerCreate({
    moveNames,
    digimonNames
}) {

    const [partner, setPartner] = useState({
        name: "",
        tamer_id: "AceMaker001",
        abi: 1,
        moves: [],
        evos: [],
        wantedEvos: [],
        dateConverted: helper.todaysFormattedDate(),
        megaOrder: 0,
        ultraOrder: 0,
    })

    const [moveList, setMoveList] = useState([])
    const [evoList, setEvoList] = useState([])
    const [wantedEvoList, setWantedEvoList] = useState([])

    const [moveQuery, setMoveQuery] = useState("")

    const [evoQuery, setEvoQuery] = useState("")
    const [evoPlacement, setEvoPlacement] = useState(0)

    const [wantedEvoQuery, setWantedEvoQuery] = useState("")

    const handlePartnerChange = (event) => {
        setPartner({...partner, [event.target.name]: event.target.value})
    }

    const handleMoveQueryChange = (event) => {
        setMoveQuery(event.target.value)
    }

    const handleEvoQueryChange = (event) => {
        setEvoQuery(event.target.value)
    }
    const handleEvoPlacement = (event) => {
        setEvoPlacement(event.target.value)
    }

    const handleWantedEvoQueryChange = (event) => {
        setWantedEvoQuery(event.target.value)
    }

    const handleAddMove = (move) => {
        if (!moveList.includes(move)) {
            setMoveList([...moveList, move])
        }
        setMoveQuery("")
    }

    const handleRemoveMove = (move) => {
        const moveIndex = moveList.indexOf(move)
        const newMoveList = [...moveList]
        newMoveList.splice(moveIndex, 1)
        setMoveList(newMoveList)
    }

    const handleAddEvo = (evo) => {
        if (evoPlacement > 0) {
            console.log(evoPlacement)
            const newEvoList = [...evoList]
            newEvoList.splice(evoPlacement-1, 0, evo)
            setEvoList(newEvoList)
        } else {
            setEvoList([...evoList, evo])
        }
        setEvoPlacement(0)
        setEvoQuery("")
    }

    const handleRemoveEvo = (evo) => {
        const evoIndex = evoList.indexOf(evo)
        const newEvoList = [...evoList]
        newEvoList.splice(evoIndex, 1)
        setEvoList(newEvoList)
    }

    const handleAddWantedEvo = (wantedEvo) => {
        setWantedEvoList([...wantedEvoList, wantedEvo])
        setWantedEvoQuery("")
    }

    const handleRemoveWantedEvo = (evo) => {
        const evoIndex = wantedEvoList.indexOf(evo)
        const newWantedEvoList = [...wantedEvoList]
        newWantedEvoList.splice(evoIndex, 1)
        setWantedEvoList(newWantedEvoList)
    }

    const moveNamesList = Object.entries(moveNames).map(([id, name]) => ({ id, name }));
    const digimonNamesList = Object.entries(digimonNames).map(([id, name]) => ({ id, name }));

    const moveQueriedList = moveQuery ? moveNamesList.filter(move => move.name.toLowerCase().includes(moveQuery)): []
    const evoQueriedList = evoQuery ? digimonNamesList.filter(digimon => digimon.name.toLowerCase().includes(evoQuery)): []
    const wantedEvoQueriedList = wantedEvoQuery ? digimonNamesList.filter(digimon => digimon.name.toLowerCase().includes(wantedEvoQuery)): []

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...partner}
        const simpleEvos = []
        const simpleWantedEvos = []
        for (let evo of evoList) {
            simpleEvos.push(evo.id)
        }
        for (let evo of wantedEvoList) {
            simpleWantedEvos.push(evo.id)
        }
        data["moves"] = moveList
        data["evos"] = simpleEvos
        data["wantedEvos"] = simpleWantedEvos
        setPartner(data)
        console.log(data)
    }



    return (
        <div>
            <div className="flex-items">
                <h1 className='white'>Partner Create</h1>
                <NavLink to="/digilist">
                    <h2 className='white'
                        style={{margin: "30px 0 0 25px"}}
                    >Digimon List</h2>
                </NavLink>
            </div>
            <div className="flex-between">
                <div>
                    <h2 className="white">Name: {partner.name}</h2>
                    <h3 className="white">{evoList.length > 0? `Current Form: ${evoList[evoList.length-1].name}`: null}</h3>
                    <h3 className="white">Tamer: {partner.tamer_id}</h3>
                    <h3 className="white">ABI: {partner.abi}</h3>
                    <h3 className="white">{partner.megaOrder? `Mega Order: ${partner.megaOrder}`: null}</h3>
                    <h3 className="white">{partner.ultraOrder? `Ultra Order: ${partner.ultraOrder}`: null}</h3>
                    <h3 className="white">{moveList.length > 0? "Moves: ": null}</h3>
                    {moveList.map((move, index) => {
                        return(
                            <h3 className="white pointer"
                                onClick={() => {handleRemoveMove(move)}}
                            >{move}</h3>
                        )
                    })}
                    <h3 className="white">{evoList.length > 0? "Evolutions: ": null}</h3>
                    {evoList.map((evo, index) => {
                        return(
                            <h3 className="white pointer"
                                onClick={() => {handleRemoveEvo(evo)}}
                            >{index == evoList.length - 1? "Latest: ": `${index + 1}: `} {evo? evo.name : ""}</h3>
                        )
                    })}
                    <h3 className="white">{wantedEvoList.length > 0? "Wanted Evolutions: ": null}</h3>
                    {wantedEvoList.map((evo, index) => {
                        return(
                            <h3 className="white pointer"
                                onClick={() => {handleRemoveWantedEvo(evo)}}
                            >{evo? evo.name : ""}</h3>
                        )
                    })}
                </div>
                <span>
                    <div>
                        <h5 className="label white">Name </h5>
                        <input
                            // className="builder-input"
                            type="text"
                            placeholder=" Partner Name"
                            onChange={handlePartnerChange}
                            name="name"
                            value={partner.name}>
                        </input>
                    </div>
                    <div>
                        <h5 className="label white">ABI </h5>
                        <input
                            // className="builder-input"
                            type="number"
                            placeholder=" ABI"
                            onChange={handlePartnerChange}
                            name="abi"
                            value={partner.abi}>
                        </input>
                    </div>
                    <div>
                        <h5 className="label white">Mega Order </h5>
                        <input
                            // className="builder-input"
                            type="number"
                            placeholder=" Mega Order"
                            onChange={handlePartnerChange}
                            name="megaOrder"
                            value={partner.megaOrder}>
                        </input>
                    </div>
                    <div>
                        <h5 className="label white">Ultra Order </h5>
                        <input
                            // className="builder-input"
                            type="number"
                            placeholder=" Ultra Order"
                            onChange={handlePartnerChange}
                            name="ultraOrder"
                            value={partner.ultraOrder}>
                        </input>
                    </div>
                </span>
                <span>
                    <span>
                        <div>
                            <h5 className="label white">Partner Move Select</h5>
                            <input
                                // className="builder-input"
                                type="text"
                                placeholder=" Move Name"
                                onChange={handleMoveQueryChange}
                                value={moveQuery}>
                            </input>
                        </div>
                        {moveQueriedList.map((move, index) => {
                            return(
                                <h3 className="white pointer"
                                    onClick={() => handleAddMove(move.name)}
                                >{move.name}</h3>
                            )
                        })}
                    </span>
                    <span>
                        <div>
                            <h5 className="label white">Partner Evolution Select</h5>
                            <input
                                // className="builder-input"
                                type="text"
                                placeholder=" Digimon Name"
                                onChange={handleEvoQueryChange}
                                value={evoQuery}>
                            </input>
                        </div>
                        <input
                            // className="builder-input"
                            type="number"
                            placeholder=" Place in list"
                            onChange={handleEvoPlacement}
                            value={evoPlacement}>
                        </input>
                        {evoQueriedList.map((evo, index) => {
                            return(
                                <h3 className="white pointer"
                                    onClick={() => handleAddEvo(evo)}
                                >{evo.name}</h3>
                            )
                        })}
                    </span>
                    <span>
                        <div>
                            <h5 className="label white">Partner Wanted Evolution Select</h5>
                            <input
                                // className="builder-input"
                                type="text"
                                placeholder=" Digimon Name"
                                onChange={handleWantedEvoQueryChange}
                                value={wantedEvoQuery}>
                            </input>
                        </div>
                        {wantedEvoQueriedList.map((evo, index) => {
                            return(
                                <h3 className="white pointer"
                                    onClick={() => handleAddWantedEvo(evo)}
                                >{evo.name}</h3>
                            )
                        })}
                    </span>
                </span>
            </div>
            <button
                onClick={handleSubmit}
            >Create Partner</button>
        </div>
    );
}

export default PartnerCreate;
