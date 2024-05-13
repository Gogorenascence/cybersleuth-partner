import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DigimonQueryContext } from '../Context/DigimonQueryContext';



function DigimonList({
    fullDigimonList,
    moveNames
}) {

    const {
        digiQuery,
        setDigiQuery,
        sortState,
    } = useContext(DigimonQueryContext);

    // const [listView, setListView] = useState(false);
    // const [showMore, setShowMore] = useState(20);

    const [moveQuery, setMoveQuery] = useState("")

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
    const handleQueryChange = (event) => {
        setDigiQuery({...digiQuery, [event.target.name]: event.target.value})
    }

    const handleMoveQueryChange = (event) => {
        setMoveQuery(event.target.value)
    }

    const allDigimon = fullDigimonList.filter(digimon => digimon.name.toLowerCase().includes(digiQuery.digimonName.toLowerCase()))
    .filter(digimon => digiQuery.move? digimon.moves.includes(digiQuery.move): true)
    .filter(digimon => digiQuery.stage? digimon.stage.name === digiQuery.stage: true)

    const moveNamesList = Object.entries(moveNames).map(([id, name]) => ({ id, name }));
    const moveQueriedList = moveQuery ? moveNamesList.filter(move => move.name.toLowerCase().includes(moveQuery.toLowerCase())): []
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

    const resetDigiQuery = () => {
        setDigiQuery({
            digimonName: "",
            digimon_id: 0,
            neighbor: "",
            move: "",
            stage: "",
        })
        setMoveQuery("")
    }

    console.log(allDigimon[10])
    //     const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div className="cyberspace">
            <div className="flex-items">
                <h1 className='white'>Digimon List</h1>
            </div>

            <h5 className="label white">Digimon Name </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Digimon Name"
                onChange={handleQueryChange}
                name="digimonName"
                value={digiQuery.digimonName}>
            </input>
            <br/>
            <h5 className="label white">Stage</h5>
            <select
                className="builder-select"
                type="text"
                placeholder=" Stage"
                onChange={handleQueryChange}
                name="stage"
                value={digiQuery.stage}>
                <option value="">No Stage Selected</option>
                <option value="Ultra">Ultra</option>
                <option value="Mega">Mega</option>
                <option value="Ultimate">Ultimate</option>
                <option value="Champion">Champion</option>
                <option value="Armor">Armor</option>
                <option value="Rookie">Rookie</option>
                <option value="Training 2">Training 2</option>
                <option value="Training 1">Training 1</option>
                <option value="-">-</option>
            </select>

            <span>
                <div>
                    <h5 className="label white">Move</h5>
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
                            <h3 className={move.name == digiQuery.move? "white pointer selected": "white pointer"}
                                onClick={() => setDigiQuery({...digiQuery, ["move"]: move.name})}
                            >{move.name}</h3>
                        )
                    })}
                </div>
            </span>
            <br/>
            <button
                className="margin-bottom-20p"
                onClick={resetDigiQuery}
            >
                Reset Filters
            </button>
            {allDigimon && allDigimon.length > 0?
                <h2 className='white'>
                    Showing {allDigimon.length} Digimon
                </h2>: null
            }
            <div className="media-list-fill">
                {allDigimon.map((digimon, index) => {
                    return(
                        <NavLink className="navlink" to={`/digimon/${digimon.id}`}>
                            <div className='digiBox'
                            style={{marginTop: index < 0 ? "10px": "",
                            marginBottom: index < allDigimon.length - 1 ? "10px": "" }}
                            >
                                    <img className='dotImage' src={digimon.imageData} />
                                    <h2 className='white'>{digimon.name}</h2>
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
