import React, { useEffect, useState } from "react";

function BackToTop() {
    const showOnPx = 300;
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const scrollContainer = () => {
            return document.documentElement || document.body;
        };

        const handleScroll = () => {
            if (scrollContainer().scrollTop > showOnPx){
                setShowButton(true);
            }else{
                setShowButton(false);
            }
        };

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [showOnPx]);

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <img
                className={`back-to-top ${showButton ? null : "hidden"}`}
                src="https://i.imgur.com/SzW3iCx.png"
                onClick={goToTop}>
            </img>
        </div>
    );
}

export default BackToTop;
