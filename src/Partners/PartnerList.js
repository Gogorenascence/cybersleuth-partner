import React, { useState, useEffect } from 'react';

function PartnerList({
    digimonList
}) {

    const [partners, setPartners] = useState([])

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

export default PartnerList;
