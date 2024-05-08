import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DigimonQueryContext } from '../Context/DigimonQueryContext';

function DigimonList({
    moves,
    moveNames,
    digimonNames,
    neighbors,
    fullDigimonList
}) {

    // const [digimonList, setDigimonList] = useState([]);

    // const handleBoosterSetChange = (event) => {
    //     setBoosterSetId(event.target.value)
    //     const selectedBoosterSet = booster_sets.find(set => set.id === event.target.value);
    //     setBoosterSet(selectedBoosterSet)
    //     console.log(boosterSet[rarity])
    // };

    // const handleRarityChange = (event) => {
    //     setRarity(event.target.value);
    //     console.log(rarity)
    // };

    const {
        query,
        setQuery,
        sortState,
        setSortState,
    } = useContext(DigimonQueryContext);

    // const [listView, setListView] = useState(false);
    // const [showMore, setShowMore] = useState(20);

    // const [noCards, setNoCards] = useState(false);

    // const getCards = async() =>{
    //     if (newCards.length == 0 ) {
    //         setNoCards(true)
    //     }
    //     const sortedCards = [...digimons].sort(sortMethods[sortState].method);

    //     const typedCards = []
    //     for (let card of sortedCards){
    //         if (card.card_type[0] === 1001) {
    //             card["cardType"] = "Fighter"
    //         }
    //         else if (card.card_type[0] === 1002) {
    //             card["cardType"] = "Aura"
    //         }
    //         else if (card.card_type[0] === 1003) {
    //             card["cardType"] = "Move"
    //         }
    //         else if (card.card_type[0] === 1004) {
    //             card["cardType"] = "Ending"
    //         }
    //         else if (card.card_type[0] === 1005) {
    //             card["cardType"] = "Any Type"
    //         }
    //         else if (card.card_type[0] === 1006) {
    //             card["cardType"] = "Item"
    //         }
    //         else if (card.card_type[0] === 1007) {
    //             card["cardType"] = "Event"
    //         }
    //         else if (card.card_type[0] === 1008) {
    //             card["cardType"] = "Comeback"
    //         }

    //         card["effectText"] = card.effect_text.split("//")

    //         if (card.second_effect_text){
    //             card["secondEffectText"] = card.second_effect_text.split("//")
    //         }

    //         typedCards.push(card)
    //     }
    //     setNewCards(typedCards);
    // };

    // const navigate = useNavigate()

    // const getRandomCard = async() =>{
    //     const randomIndex = Math.floor(Math.random() * cards.length);
    //     const randomCard = cards[randomIndex].card_number;
    //     console.log(randomCard.card_number)
    //     navigate(`/cards/${randomCard}`)
    // }

    // useEffect(() => {
    //     window.scroll(0, 0);
    //     getCards();
    //     console.log(cards)
    //     document.title = "Cards - PM CardBase"
    //     return () => {
    //         document.title = "PlayMaker CardBase"
    //     };
    // // eslint-disable-next-line
    // },[]);

    const sortMethods = {
        none: { method: (a,b) => a.id - b.id },
        name: { method: (a,b) => b.name.localeCompare(a.name) },
        id_num: { method: (a,b) => b.id - a.id },
        level: { method: (a,b) => a.stage.level - b.stage.level },
    };

    // const handleQuery = (event) => {
    //     setQuery({ ...query, [event.target.name]: event.target.value });
    //     setShowMore(20)
    //     console.log(query)
    // };

    // const handleQueryReset = (event) => {
    //     setQuery({
    //         cardName: "",
    //         cardText: "",
    //         cardNumber: "",
    //         heroID: "",
    //         series: "",
    //         startingNum: "",
    //         type: "",
    //         cardClass: "",
    //         extraEffect: "",
    //         reaction: "",
    //         tag: "",
    //     });
    //     setShowMore(20)
    //     setSortState("none")
    //     setBoosterSetId("")
    //     setBoosterSet("");
    //     setRarity("")
    // };

    // const handleSort = (event) => {
    //     setSortState(event.target.value);
    // };

    // const handleShowMore = (event) => {
    //     setShowMore(showMore + 20);
    // };

    // const handleListView = (event) => {
    //     setListView(!listView);
    //     setShowMore(20)
    // };

    const allDigimon = fullDigimonList.filter(digimon => digimon.name.toLowerCase().includes(query.digimonName.toLowerCase()))
    //     .filter((digimon, index, arr) => (digimon.effect_text + digimon.second_effect_text).toLowerCase().includes(query.digimonText.toLowerCase()))
    //     .filter(digimon => digimon.digimon_number.toString().includes(query.digimonNumber))
    //     .filter(digimon => digimon.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
    //     .filter((digimon, index, arr) => digimon.series_name.toLowerCase().includes(query.series.toLowerCase()))
    //     .filter(digimon => digimon.digimon_number > query.startingNum - 1)
    //     .filter(digimon => query.type? digimon.digimon_type.some(type => type.toString() == query.type):digimon.digimon_type)
    //     .filter(digimon => digimon.digimon_class.includes(query.digimonClass))
    //     .filter(digimon => query.extraEffect? digimon.extra_effects.some(effect => effect.toString() == query.extraEffect):digimon.extra_effects)
    //     .filter(digimon => query.reaction? digimon.reactions.some(reaction => reaction.toString() == query.reaction):digimon.reactions)
    //     .filter(digimon => query.tag? digimon.digimon_tags.some(tag => tag.toString() == query.tag):digimon.digimon_tags)
    //     .filter(digimon => boosterSet && !rarity ? boosterSet.all_digimons.includes(digimon.digimon_number):digimon.digimon_number)
    //     .filter(digimon => boosterSet && rarity ? boosterSet[rarity].includes(digimon.digimon_number):digimon.digimon_number)
    .sort(sortMethods[sortState].method)

    console.log(allDigimon[10])
    //     const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div>
            <div className="flex-items">
                <h1 className='white'>Digimon List</h1>
                <NavLink to="/partnercreate">
                    <h2 className='white'
                        style={{margin: "30px 0 0 25px"}}
                    >Partner Create</h2>
                </NavLink>
            </div>
            <div className="list-grid3">
                {allDigimon.map((digimon, index) => {
                    return(
                        <NavLink to={`/digimon/${digimon.id}`}>
                            <div className='digiBox'
                            style={{marginTop: index < 0 ? "10px": "",
                            marginBottom: index < allDigimon.length - 1 ? "10px": "" }}
                            >
                                    <img src={digimon.imageData} />
                                    <h2 className='white'>{digimon.id}. {digimon.name}</h2>
                                    <h2 className='white'>{digimon.stage?.name}</h2>
                            </div>
                        </NavLink>
                    )})
                }
            </div>
        </div>
    );
}

export default DigimonList;
