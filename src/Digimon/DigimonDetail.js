import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { DigimonQueryContext } from '../Context/DigimonQueryContext';

function DigimonDetail({
    fullDigimonList
}) {
    console.log("dogmon")
    const { digimon_id } = useParams()
    const [digimon, setDigimon] = useState("")
    const [prevEvos, setPrevEvos] = useState([])
    const [nextEvos, setNextEvos] = useState([])

    const getDigimon = async() => {
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

    useEffect(() => {
        window.scroll(0, 0);
        getDigimon();
    // eslint-disable-next-line
    },[digimon_id]);

    useEffect(() => {
        document.title = `${digimon.name} - Cyber Sleuth Partner`
        return () => {
            document.title = "Cyber Sleuth Partner"
        };
    // eslint-disable-next-line
    },[digimon]);


    return (
        <div className="cyberspace">
            <img className='dotImage' src={digimon.imageData}/>
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
                        <NavLink to={`/digimon/${prevEvo.id}`}>
                            <div className='digiBox'>
                                <img className='dotImage' src={prevEvo.imageData}/>
                                <h3 className='white'>{prevEvo.id}. {prevEvo.name}</h3>
                            </div>
                        </NavLink>
                    </>
                )})
            }
            <h2 className='white'>{nextEvos.length > 0 ? "Evolves to:":null}</h2>
            {nextEvos?.map(nextEvo => {
                return(
                    <>
                        <NavLink to={`/digimon/${nextEvo.id}`}>
                            <div className='digiBox'>
                                <img className='dotImage' src={nextEvo.imageData} />
                                <h3 className='white'>{nextEvo.id}. {nextEvo.name}</h3>
                            </div>
                        </NavLink>
                    </>
                )})
            }
            <a href={digimon.infoURL}>
                <h2 className='white'>Link to DigiDB.io</h2>
            </a>
            <NavLink to={"/digilist"}>
                <h1 className='white'>Back to Digimon List</h1>
            </NavLink>
        </div>
    );
}

export default DigimonDetail;
