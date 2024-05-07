import React, { useState, useEffect } from 'react';
import helper from '../Helper';


function PartnerCreate({
    digimonList
}) {

    const [partner, setPartner] = useState({
        name: "",
        tamer_id: "",
        abi: 0,
        moves: [],
        evos: [],
        wantedEvos: [],
        date_converted: helper.todaysFormattedDate(),
        megaOrder: 0,
        ultraOrder: 0,
    })

    const [moveList, setMoveList] = useState([])
    const [evoList, setEvoList] = useState([])
    const [wantedEvoList, setWantedEvoList] = useState([])

    const handlePartnerChange = (event) => {
        setPartner({...partner, [event.target.name]: event.target.value})
    }

    const handleAddMove = (move) => {
        if (!moveList.includes(move)) {
            setMoveList([...moveList, move])
        }
    }

    const handleRemoveMove = (move) => {
        const moveIndex = moveList.indexOf(move)
        const newMoveList = [...moveList]
        newMoveList.splice(moveIndex, 1)
        setMoveList(newMoveList)
    }

    const handleAddEvo = (evo) => {
        setEvoList([...evoList, evo])
    }

    const handleRemoveEvo = (evo) => {
        const evoIndex = evoList.indexOf(evo)
        const newEvoList = [...evoList]
        newEvoList.splice(evoIndex, 1)
        setEvoList(newEvoList)
    }

    const handleAddWantedEvo = (wantedEvo) => {
        setEvoList([...wantedEvoList, wantedEvo])
    }

    const handleRemoveWantedEvo = (evo) => {
        const evoIndex = wantedEvoList.indexOf(evo)
        const newWantedEvoList = [...wantedEvoList]
        newWantedEvoList.splice(evoIndex, 1)
        setWantedEvoList(newWantedEvoList)
    }


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const newIndex = Math.floor(Math.random() * 6);
    //         setPieceIndex(newIndex);
    //     }, 1000);

    //     // Clear the interval when the component unmounts
    //     return () => clearInterval(intervalId);
    // }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            {/* <img className='piece'
                src={pieces[pieceIndex]}
                alt={`Piece ${pieceIndex}`}
            /> */}
        </div>
    );
}

export default PartnerCreate;
