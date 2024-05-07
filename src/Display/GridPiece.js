import React, { useState, useEffect } from 'react';

function GridPiece() {
    const pieces = [
        "pixelBack/csback1.png",
        "pixelBack/csback2.png",
        "pixelBack/csback3.png",
        "pixelBack/csback4.png",
        "pixelBack/csback5.png",
        "pixelBack/csback6.png"
    ];

    const [pieceIndex, setPieceIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newIndex = Math.floor(Math.random() * 6);
            setPieceIndex(newIndex);
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            <img className='piece'
                src={pieces[pieceIndex]}
                alt={`Piece ${pieceIndex}`}
            />
        </div>
    );
}

export default GridPiece;
