import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import helper from '../Helper';
import partnerQueries from './PartnerQueries';
import { AuthContext } from '../Context/AuthContext';
import { PartnerQueryContext } from '../Context/PartnerQueryContext';


function PartnerEdit({
    moveNames,
    digimonNames,
    fullDigimonList
}) {

    const { partner_id } = useParams()
    const {account} = useContext(AuthContext)
    const {setRefresh} = useContext(PartnerQueryContext)
    const navigate = useNavigate()

    const [partner, setPartner] = useState({
        name: "",
        tamer_id: "",
        dateConverted: "",
        abi: 1,
        moves: [],
        evos: [],
        wantedEvos: [],
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
    const [pathFinderString, setPathFinderString] = useState("")

    const getPartner = async () => {
        const partnerData = await partnerQueries.getPartnerDataById(partner_id)
        if (partnerData) {
            console.log(partnerData)
            setPartner(partnerData)
            setMoveList(partnerData.moves)
            const partnerEvos = []
            for (let evoId of partnerData.evos) {
                const partnerEvo = digimonNamesList.find(evo => evo.id === evoId)
                partnerEvos.push(partnerEvo)
            }
            setEvoList(partnerEvos)

            const partnerWantedEvos = []
            for (let evoId of partnerData.wantedEvos) {
                const partnerWantedEvo = digimonNamesList.find(evo => evo.id === evoId)
                partnerWantedEvos.push(partnerWantedEvo)
            }
            setWantedEvoList(partnerWantedEvos)

        }
    }

    useEffect(() => {
        // window.scroll(0, 0);
        getPartner();
    // eslint-disable-next-line
    },[partner_id]);

    useEffect(() => {
        document.title = `Editing ${partner.name} - Cyber Sleuth Partner`
        return () => {
            document.title = "Cyber Sleuth Partner"
        };
    // eslint-disable-next-line
    },[partner]);

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
            console.log(evo)
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

    const handlePathFinderString = (event) => {
        const pathFinderString = event.target.value
        const pathFinderList = pathFinderString.replaceAll(" Evolve to: ", ',')
            .replaceAll(" Devolve to: ", ",")
            .replaceAll("*", "")
            .split(",")
        const newWantedEvoList = [...wantedEvoList]
        for (let item of pathFinderList) {
            const digiItem = digimonNamesList.find(digimonItem => digimonItem.name === item)
            if (digiItem) {
                newWantedEvoList.push(digiItem)
            }
        }
        console.log(newWantedEvoList)
        setWantedEvoList(newWantedEvoList)
        setPathFinderString(event.target.value)
    }

    const moveNamesList = Object.entries(moveNames).map(([id, name]) => ({ id, name }));
    const digimonNamesList = Object.entries(digimonNames).map(([id, name]) => ({ id, name }));

    const moveQueriedList = moveQuery ? moveNamesList.filter(move => move.name.toLowerCase().includes(moveQuery.toLowerCase())): []
    const evoQueriedList = evoQuery ? digimonNamesList.filter(digimon => digimon.name.toLowerCase().includes(evoQuery.toLowerCase())): []
    const wantedEvoQueriedList = wantedEvoQuery ? digimonNamesList.filter(digimon => digimon.name.toLowerCase().includes(wantedEvoQuery.toLowerCase())): []

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (account && partner.name && account.id === partner.tamer_id && evoList.length > 0) {
            const data = {...partner}

            const simpleEvos = []
            const simpleWantedEvos = []
            for (let evo of evoList) {
                simpleEvos.push(evo.id)
            }
            for (let evo of wantedEvoList) {
                simpleWantedEvos.push(evo.id)
            }
            const currentFormId = simpleEvos[simpleEvos.length - 1]
            const currentForm = fullDigimonList.find(digimon => digimon.id === currentFormId)

            data["currentForm"] = currentForm
            data["imageData"] = currentForm.imageData

            data["moves"] = moveList
            data["evos"] = simpleEvos
            data["wantedEvos"] = simpleWantedEvos

            console.log(data)

            const partnerResponse = await partnerQueries.editPartner(partner_id, data)
            if (partnerResponse) {
                console.log(partnerResponse)
                setRefresh(true)
                navigate(`/partner/${partner.id}`)
            }
        } else {
            alert("Your partner needs a name and at least 1 form!")
        }
    }


    return (
        <div className="cyberspace">
            <div className="flex-items">
                <h1 className='white'>Partner Edit</h1>
            </div>
            <div className="media-flex-between">

                <div>
                    <span>
                        <h5 className="label white">Name </h5>
                        <input
                            className="builder-input"
                            type="text"
                            placeholder=" Partner Name"
                            onChange={handlePartnerChange}
                            name="name"
                            value={partner.name}>
                        </input>

                        <h5 className="label white">ABI </h5>
                        <input
                            className="builder-input"
                            type="number"
                            placeholder=" ABI"
                            onChange={handlePartnerChange}
                            name="abi"
                            value={partner.abi}>
                        </input>

                        <h5 className="label white">Date Converted</h5>
                        <input
                            className="builder-input"
                            type="date"
                            placeholder=" Date"
                            max={helper.todaysFormattedDate()}
                            onChange={handlePartnerChange}
                            name="dateConverted"
                            value={partner.dateConverted}>
                        </input>

                        <h5 className="label white">Mega Order </h5>
                        <input
                            className="builder-input"
                            type="number"
                            placeholder=" Mega Order"
                            onChange={handlePartnerChange}
                            name="megaOrder"
                            value={partner.megaOrder}>
                        </input>

                        <h5 className="label white">Ultra Order </h5>
                        <input
                            className="builder-input"
                            type="number"
                            placeholder=" Ultra Order"
                            onChange={handlePartnerChange}
                            name="ultraOrder"
                            value={partner.ultraOrder}>
                        </input>
                    </span>
                    <span>
                        <div>
                            <h5 className="label white">Partner Move Select</h5>
                            <input
                                className="builder-input"
                                type="text"
                                placeholder=" Move Name"
                                onChange={handleMoveQueryChange}
                                value={moveQuery}>
                            </input>
                        </div>

                        <div className={moveQueriedList.length > 0? "partner-scrollable2": "none"}>
                            {moveQueriedList.map((move, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => handleAddMove(move.name)}
                                    >{move.name}</h3>
                                )
                            })}
                        </div>
                    </span>
                    <h3 className="white">{moveList.length > 0? "Moves: ": null}</h3>
                    {moveList.length >0?
                        <div className="partner-scrollable">
                            {moveList.map((move, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => {handleRemoveMove(move)}}
                                    >{move}</h3>
                                )
                            })}
                        </div>: null
                    }
                </div>


                <span>
                    <h3 className="white">{evoList.length > 0? `Current Form: ${evoList[evoList.length-1].name}`: null}</h3>
                    <span>
                        <div className="flex">
                            <span>
                                <h5 className="label white">Partner Evolution Select</h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Digimon Name"
                                    onChange={handleEvoQueryChange}
                                    value={evoQuery}>
                                </input>
                            </span>
                            <span>
                                <h5 className="label white">Order</h5>
                                <input
                                    className="builder-input-small"
                                    type="number"
                                    placeholder=" Place in list"
                                    onChange={handleEvoPlacement}
                                    value={evoPlacement}>
                                </input>
                            </span>
                        </div>
                        <div className={evoQueriedList.length > 0? "partner-scrollable2": "none"}>
                            {evoQueriedList.map((evo, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => handleAddEvo(evo)}
                                    >{evo.name}</h3>
                                )
                            })}
                        </div>
                    </span>
                    <h3 className="white">{evoList.length > 0? "Evolutions: ": null}</h3>
                    {evoList.length > 0?
                        <div className="partner-scrollable">
                            {evoList.map((evo, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => {handleRemoveEvo(evo)}}
                                    >{index == evoList.length - 1? "Latest: ": `${index + 1}: `} {evo? evo.name : ""}</h3>
                                )
                            })}
                        </div>:null
                    }
                </span>
                <span>
                    <span>
                        <div>
                            <h5 className="label white">Wanted Evolution Select</h5>
                            <input
                                className="builder-input"
                                type="text"
                                placeholder=" Digimon Name"
                                onChange={handleWantedEvoQueryChange}
                                value={wantedEvoQuery}>
                            </input>
                        </div>
                        <div className={wantedEvoQueriedList.length > 0? "partner-scrollable2" : "none"}>
                            {wantedEvoQueriedList.map((evo, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => handleAddWantedEvo(evo)}
                                    >{evo.name}</h3>
                                )
                            })}
                        </div>
                    </span>
                    <span>
                        <h5 className="label white">Wanted Evolution Path</h5>
                        <input
                            className="builder-input"
                            type="text"
                            placeholder=" Path Finder String"
                            onChange={handlePathFinderString}
                            value={pathFinderString}>
                        </input>
                    </span>
                    <h3 className="white">{wantedEvoList.length > 0? "Wanted Evolutions: ": null}</h3>
                    {wantedEvoList.length > 0?
                        <div className="partner-scrollable">
                            {wantedEvoList.map((evo, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => {handleRemoveWantedEvo(evo)}}
                                    >{evo? evo.name : ""}</h3>
                                )
                            })}
                        </div>: null
                    }

                </span>

            </div>
            <button
                onClick={handleSubmit}
            >Save Partner</button>
            <button
                onClick={getPartner}
            >Reset Partner</button>
        </div>
    );
}

export default PartnerEdit;
