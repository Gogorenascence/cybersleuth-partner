import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import partnerQueries from './PartnerQueries';
import { AuthContext } from '../Context/AuthContext';


function PartnerDetail({
    fullDigimonList,
    digimonNames
}) {
    const { partner_id } = useParams()
    const { account } = useContext(AuthContext)
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
            const currentFormId = partnerData.evos[partnerData.evos.length - 1]
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
            // eslint-disable-next-line
        },[partner_id]);

    useEffect(() => {
        document.title = `${partner.name} - Cyber Sleuth Partner`
        return () => {
                document.title = "Cyber Sleuth Partner"
            };
            // eslint-disable-next-line
        },[partner]);

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
        <div className="cyberspace">
            <div>
                <span className="flex">
                    <h1 className="white">{partner.name}</h1>
                    {account && partner && account.id === partner.tamer_id?
                        <>
                            <NavLink to={`/partner/${partner_id}/edit`}>
                                <h3 className="white">&nbsp; [Edit]</h3>
                            </NavLink>
                            <h3 className="white pointer"
                                onClick={() => setShowPrompt(!showPrompt)}
                            >&nbsp; [Delete]</h3>
                        </>: null
                    }
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
                        <img className='dotImage' src={partner.currentForm.imageData} />
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
                        <div className="partner-scrollable">
                            {partner.moves.map((move, index) => {
                                return(
                                    <h3 className="white pointer">{move}</h3>
                                )
                            })}
                        </div>
                    </>: null
                }
                { partner.evos && partner.evos.length > 1?
                    <>
                        <h3 className="white">Evolutions: </h3>
                        <div className="partner-scrollable">
                            {partner.evos.slice(0, partner.evos.length - 1).map((evo, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => {setDigimonID(evo)}}
                                    >
                                        {`${index + 1}: `} {evo? matchEvo(evo) : ""}
                                    </h3>
                                )
                            })}
                        </div>
                    </>: null
                }
                { partner.wantedEvos && partner.wantedEvos.length > 0?
                    <>
                        <h3 className="white">Wanted Evolutions: </h3>
                        <div className="partner-scrollable">
                            {partner.wantedEvos.map((evo, index) => {
                                return(
                                    <h3 className="white pointer"
                                        onClick={() => {setDigimonID(evo)}}
                                    >
                                        {evo? matchEvo(evo) : ""}
                                    </h3>
                                )
                            })}
                        </div>
                    </>: null
                }
            </div>
            <div>
                <h1 className='white'>Partner Evolution Tree</h1>
                <h3 className='white'> Click on Current Form, Evolutions or Wanted Evolution to change tree below</h3>
                <img className='dotImage' src={digimon.imageData} />
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
                {prevEvos?.map((prevEvo, index) => {
                    return(
                        <>
                            <div className='digiBox pointer'
                                style={{marginTop: index < 0 ? "10px": "",
                                marginBottom: index < prevEvos.length - 1 ? "10px": "" }}
                                onClick={() => {setDigimonID(prevEvo.id)}}
                            >
                                <img className='dotImage' src={prevEvo.imageData} />
                                <h3 className='white'>{prevEvo.id}. {prevEvo.name}</h3>
                            </div>
                        </>
                    )})
                }
                <h2 className='white'>{nextEvos.length > 0 ? "Evolves to:":null}</h2>
                {nextEvos?.map((nextEvo, index) => {
                    return(
                        <>
                            <div className='digiBox pointer'
                                onClick={() => {setDigimonID(nextEvo.id)}}
                                style={{marginTop: index < 0 ? "10px": "",
                                marginBottom: index < nextEvos.length - 1 ? "10px": "" }}
                            >
                                <img className='dotImage' src={nextEvo.imageData} />
                                <h3 className='white'>{nextEvo.id}. {nextEvo.name}</h3>
                            </div>
                        </>
                    )})
                }
                {digimon?
                    <a href={digimon.infoURL} className='navlink'>
                        <h2 className='white'>Link to DigiDB.io</h2>
                    </a>: null
                }
                <NavLink to={"/partners"} className="navlink">
                    <h1 className='white'>Back to Partners</h1>
                </NavLink>
            </div>
        </div>
    );
}

export default PartnerDetail;
