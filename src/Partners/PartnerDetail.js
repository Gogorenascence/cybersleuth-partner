import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { DigimonQueryContext } from '../Context/DigimonQueryContext';
import partnerQueries from './PartnerQueries';
import { set } from 'firebase/database';


function PartnerDetail({
    fullDigimonList,
    digimonNames
}) {
    console.log("dogmon")
    const { partner_id } = useParams()
    const navigate = useNavigate()

    const [partner, setPartner] = useState("")

    const [digimon_id, setDigimonID] = useState(null)
    const [digimon, setDigimon] = useState("")
    const [prevEvos, setPrevEvos] = useState([])
    const [nextEvos, setNextEvos] = useState([])

    const [prompt, setPrompt] = useState("")
    const [showPrompt, setShowPrompt] = useState(false)

    const getPartner = async () => {
        const partnerData = await partnerQueries.getPartnerDataById(partner_id)
        if (partnerData) {
            console.log(partnerData)
            const currentFormId = partnerData.evos[partnerData.evos.length - 1]
            const currentForm = fullDigimonList.find(digimon => digimon.id === currentFormId)
            partnerData["currentForm"] = currentForm
            partnerData["imageData"] = currentForm.imageData
            console.log(partnerData)
            setPartner(partnerData)
            setDigimonID(currentFormId)
        }
    }

    const getDigimon = async() => {
        if (digimon_id) {
            const digimonData = fullDigimonList.find(mon => mon.id == digimon_id)
            console.log(digimonData)
            const prev = []
            const next = []

            for (let mon_id of digimonData.neighbors.prev) {
                console.log(digimonData.neighbors.prev)
                const prevNeighbor = fullDigimonList.find(mon => mon.id == mon_id)
                prev.push(prevNeighbor)
            }
            for (let mon_id of digimonData.neighbors.next) {
                const nextNeighbor = fullDigimonList.find(mon => mon.id == mon_id)
                next.push(nextNeighbor)
            }

            setDigimon(digimonData)
            setPrevEvos(prev)
            setNextEvos(next)
        }
    }


    useEffect(() => {
        window.scroll(0, 0);
        getPartner();
        // console.log(cards)
        // document.title = "Cards - PM CardBase"
        // return () => {
            //     document.title = "PlayMaker CardBase"
            // };
            // eslint-disable-next-line
        },[partner_id]);

        useEffect(() => {
            getDigimon();
            // eslint-disable-next-line
        },[digimon_id]);

        const matchEvo = (evoItem) => {
            return digimonNames[evoItem]
        }

        const deletePartner = async () => {
            if (prompt === partner.name) {
                const deleteResponse = await partnerQueries.deletePartner(partner_id)
                if (deleteResponse) {
                    navigate("/partners")
                }
            }
        }

        const handlePromptChange = (event) => {
            setPrompt(event.target.value)
        }


    return (
        <div>
            <div>
                <span className="flex">
                    <h1 className="white">{partner.name}</h1>
                    <NavLink to={`/partner/${partner_id}/edit`}>
                        <h3 className="white">&nbsp; [Edit]</h3>
                    </NavLink>
                    <h3 className="white pointer"
                        onClick={() => setShowPrompt(!showPrompt)}
                    >&nbsp; [Delete]</h3>
                </span>
                {showPrompt === true?
                    <>
                        <h4 className="label white">Type Partner Name to Delete</h4>
                        <input
                            // className="builder-input"
                            type="text"
                            placeholder="Partner Name"
                            onChange={handlePromptChange}
                            name="name"
                            value={prompt}>
                        </input>
                    </>: null
                }
                {prompt === partner.name?
                    <button onClick={deletePartner}>Delete</button>: null
                }
                { partner.currentForm?
                    <div className="pointer"
                        onClick={() => {setDigimonID(partner.currentForm.id)}}>
                        <h2 className="white">Current Form: {partner.currentForm.name}</h2>
                        <img src={partner.currentForm.imageData} />
                    </div>: null
                }
                <h3 className="white">Tamer: {partner.tamer_id}</h3>
                <h3 className="white">Date Converted: {partner.dateConverted}</h3>
                <h3 className="white">ABI: {partner.abi}</h3>
                <h3 className="white">{partner.megaOrder? `Mega Order: ${partner.megaOrder}`: null}</h3>
                <h3 className="white">{partner.ultraOrder? `Ultra Order: ${partner.ultraOrder}`: null}</h3>
                { partner.moves && partner.moves.length > 0?
                    <>
                        <h3 className="white">Moves: </h3>
                        {partner.moves.map((move, index) => {
                            return(
                                <h3 className="white">{move}</h3>
                            )
                        })}
                    </>: null
                }
                { partner.evos && partner.evos.length > 0?
                    <>
                        <h3 className="white">Evolutions: </h3>
                        {partner.evos.slice(0, partner.evos.length - 1).map((evo, index) => {
                            return(
                                <h3 className="white pointer"
                                    onClick={() => {setDigimonID(evo)}}
                                >
                                    {`${index + 1}: `} {evo? matchEvo(evo) : ""}
                                </h3>
                            )
                        })}
                    </>: null
                }
                { partner.wantedEvos && partner.wantedEvos.length > 0?
                    <>
                        <h3 className="white">Evolutions: </h3>
                        {partner.wantedEvos.map((evo, index) => {
                            return(
                                <h3 className="white pointer"
                                    onClick={() => {setDigimonID(evo)}}
                                >
                                    {evo? matchEvo(evo) : ""}
                                </h3>
                            )
                        })}
                    </>: null
                }
            </div>
            <div>
                <img src={digimon.imageData} />
                <h1 className='white'>{digimon.id}. {digimon.name}</h1>
                {digimon.stage?
                    <h1 className='white'>{digimon.stage.name}</h1>:null
                }
                {digimon.moves && digimon.moves.length > 0 ?
                    <>
                        <h2 className='white'>Moves:</h2>
                        {digimon.moves?.map(move => {
                            return(
                                <>
                                    <h3 className='white'>{move}</h3>
                                </>
                            )})
                        }
                    </>: null
                }

                <h2 className='white'>{prevEvos.length > 0 ? "Evolves from:":null}</h2>
                {prevEvos?.map(prevEvo => {
                    return(
                        <>
                            <div className='digiBox pointer'
                                onClick={() => {setDigimonID(prevEvo.id)}}
                            >
                                <img src={prevEvo.imageData} />
                                <h3 className='white'>{prevEvo.id}. {prevEvo.name}</h3>
                            </div>
                        </>
                    )})
                }
                <h2 className='white'>{nextEvos.length > 0 ? "Evolves to:":null}</h2>
                {nextEvos?.map(nextEvo => {
                    return(
                        <>
                            <div className='digiBox pointer'
                                onClick={() => {setDigimonID(nextEvo.id)}}
                            >
                                <img src={nextEvo.imageData} />
                                <h3 className='white'>{nextEvo.id}. {nextEvo.name}</h3>
                            </div>
                        </>
                    )})
                }
                <NavLink to={"/partners"}>
                    <h1 className='white'>Back</h1>
                </NavLink>
            </div>
        </div>
    );
}

export default PartnerDetail;
