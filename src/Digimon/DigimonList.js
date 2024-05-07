import React, { useState, useEffect } from 'react';

function DigimonList({
    moves,
    moveNames,
    digimonNames,
    neighbors,
    fullDigimonList
}) {

    const [digimonList, setDigimonList] = useState([]);

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

    // const {
    //     query,
    //     setQuery,
    //     sortState,
    //     setSortState,
    //     boosterSet,
    //     setBoosterSet,
    //     boosterSetId,
    //     setBoosterSetId,
    //     rarity,
    //     setRarity
    // } = useContext(QueryContext);

    // const [listView, setListView] = useState(false);
    // const [showMore, setShowMore] = useState(20);

    // const [noCards, setNoCards] = useState(false);

    // const getCards = async() =>{
    //     if (newCards.length == 0 ) {
    //         setNoCards(true)
    //     }
    //     const sortedCards = [...cards].sort(sortMethods[sortState].method);

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


    // const sortMethods = {
    //     none: { method: (a,b) => new Date(b.updated_on?.full_time.$date) - new Date(a.updated_on?.full_time.$date) },
    //     newest: { method: (a,b) => b.id.localeCompare(a.id) },
    //     oldest: { method: (a,b) => a.id.localeCompare(b.id) },
    //     name: { method: (a,b) => a.name.localeCompare(b.name) },
    //     card_number: { method: (a,b) => a.card_number - b.card_number },
    //     enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
    //     enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    // };

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

    // const all_cards = newCards.filter(card => card.name.toLowerCase().includes(query.cardName.toLowerCase()))
    //     .filter((card, index, arr) => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
    //     .filter(card => card.card_number.toString().includes(query.cardNumber))
    //     .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
    //     .filter((card, index, arr) => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
    //     .filter(card => card.card_number > query.startingNum - 1)
    //     .filter(card => query.type? card.card_type.some(type => type.toString() == query.type):card.card_type)
    //     .filter(card => card.card_class.includes(query.cardClass))
    //     .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() == query.extraEffect):card.extra_effects)
    //     .filter(card => query.reaction? card.reactions.some(reaction => reaction.toString() == query.reaction):card.reactions)
    //     .filter(card => query.tag? card.card_tags.some(tag => tag.toString() == query.tag):card.card_tags)
    //     .filter(card => boosterSet && !rarity ? boosterSet.all_cards.includes(card.card_number):card.card_number)
    //     .filter(card => boosterSet && rarity ? boosterSet[rarity].includes(card.card_number):card.card_number)
    //     .sort(sortMethods[sortState].method)

    //     const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div>
            {/* <img className='piece'
                src={pieces[pieceIndex]}
                alt={`Piece ${pieceIndex}`}
            /> */}
        </div>
    );
}

export default DigimonList;
