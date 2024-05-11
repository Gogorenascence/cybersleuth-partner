import React, { useState, useEffect, useContext} from 'react';
import partnersQueries from './PartnerQueries';
import { NavLink } from 'react-router-dom';
import { PartnerQueryContext } from '../Context/PartnerQueryContext';


function PartnersList({
    fullDigimonList,
    moveNames
}) {

    const {
        query,
        setQuery,
        resetQuery
    } = useContext(PartnerQueryContext)

    const [partners, setPartners] = useState([])

    const [moveQuery, setMoveQuery] = useState("")

    const getPartners = async () => {
        const partnersData = await partnersQueries.getPartnersData()
        if (partnersData) {
            console.log(partnersData)
            for (let partner of partnersData) {
                const currentFormId = partner.evos[partner.evos.length - 1]
                const currentForm = fullDigimonList.find(digimon => digimon.id === currentFormId)
                partner["currentForm"] = currentForm
                partner["imageData"] = currentForm.imageData
            }
            console.log(partnersData)
            setPartners(partnersData)
        }
    }

    useEffect(() => {
        getPartners()
    }, []); // Empty dependency array to run only once on mount

    const handleQueryChange = (event) => {
        setQuery({...query, [event.target.name]: event.target.value})
    }

    const handleMoveQueryChange = (event) => {
        setMoveQuery(event.target.value)
    }

    const allPartners = partners.filter(partner => partner.name.toLowerCase().includes(query.partnerName.toLowerCase()))
        .filter(partner => partner.currentForm.name.toLowerCase().includes(query.digimonName.toLowerCase()))
        .filter(partner => query.move? partner.moves.includes(query.move): true)
        .filter(partner => query.stage? partner.currentForm.stage.name === query.stage: true)

    const moveNamesList = Object.entries(moveNames).map(([id, name]) => ({ id, name }));
    const moveQueriedList = moveQuery ? moveNamesList.filter(move => move.name.toLowerCase().includes(moveQuery)): []

    // //     .filter((digimon, index, arr) => (digimon.effect_text + digimon.second_effect_text).toLowerCase().includes(query.digimonText.toLowerCase()))
    // //     .filter(digimon => digimon.digimon_number.toString().includes(query.digimonNumber))
    // //     .filter(digimon => digimon.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
    // //     .filter((digimon, index, arr) => digimon.series_name.toLowerCase().includes(query.series.toLowerCase()))
    // //     .filter(digimon => digimon.digimon_number > query.startingNum - 1)
    // //     .filter(digimon => query.type? digimon.digimon_type.some(type => type.toString() == query.type):digimon.digimon_type)
    // //     .filter(digimon => digimon.digimon_class.includes(query.digimonClass))
    // //     .filter(digimon => query.extraEffect? digimon.extra_effects.some(effect => effect.toString() == query.extraEffect):digimon.extra_effects)
    // //     .filter(digimon => query.reaction? digimon.reactions.some(reaction => reaction.toString() == query.reaction):digimon.reactions)
    // //     .filter(digimon => query.tag? digimon.digimon_tags.some(tag => tag.toString() == query.tag):digimon.digimon_tags)
    // //     .filter(digimon => boosterSet && !rarity ? boosterSet.all_digimons.includes(digimon.digimon_number):digimon.digimon_number)
    // //     .filter(digimon => boosterSet && rarity ? boosterSet[rarity].includes(digimon.digimon_number):digimon.digimon_number)
    // .sort(sortMethods[sortState].method)


    return (
        <div className="cyberspace">
            <div className="flex-items">
                <h1 className='white'>Partner List</h1>
            </div>

            <h5 className="label white">Name </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Partner Name"
                onChange={handleQueryChange}
                name="partnerName"
                value={query.partnerName}>
            </input>

            <h5 className="label white">Current Form </h5>
            <input
                className="builder-input"
                type="text"
                placeholder=" Current Form"
                onChange={handleQueryChange}
                name="digimonName"
                value={query.digimonName}>
            </input>
            <br/>
            <h5 className="label white">Stage</h5>
            <select
                className="builder-select"
                type="text"
                placeholder=" Stage"
                onChange={handleQueryChange}
                name="stage"
                value={query.stage}>
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
                            <h3 className="white pointer"
                                onClick={() => setQuery({...query, ["move"]: move.name})}
                            >{move.name}</h3>
                        )
                    })}
                </div>
            </span>
            <br/>
            <button
                className="margin-bottom-20p"
                onClick={resetQuery}
            >
                Reset Filters
            </button>
            <div className="list-grid3">
                {allPartners.map((partner, index) => {
                    return(
                        <NavLink to={`/partner/${partner.id}`}>
                            <div className='digiBox pointer'
                            style={{marginTop: index < 0 ? "10px": "",
                            marginBottom: index < partners.length - 1 ? "10px": "" }}
                            >
                                <img src={partner.imageData} />
                                <h1 className='white'>{partner.name}</h1>
                                <h2 className='white'>Current Form: {partner.currentForm.name}</h2>
                                <h2 className='white'>ABI: {partner.abi}</h2>
                                <h2 className='white'>Date Converted: {partner.dateConverted}</h2>
                                <h2 className='white'>Mega Order: {partner.megaOrder}</h2>
                                <h2 className='white'>Ultra Order: {partner.ultraOrder}</h2>
                            </div>
                        </NavLink>
                    )})
                }
            </div>
        </div>
    );
}

export default PartnersList;
