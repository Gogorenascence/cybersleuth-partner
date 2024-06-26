import React, { useState, useEffect, useContext, useRef} from 'react';
import partnerQueries from './PartnerQueries';
import userQueries from '../Accounts/userQueries';
import { NavLink } from 'react-router-dom';
import { PartnerQueryContext } from '../Context/PartnerQueryContext';
import { AuthContext } from '../Context/AuthContext';


function PartnersList({
    fullDigimonList,
    moveNames
}) {

    const {
        partners,
        setPartners,
        query,
        setQuery,
        sortState,
        setSortState,
        refresh,
        setRefresh
    } = useContext(PartnerQueryContext)
    const {account} = useContext(AuthContext)
    const results = useRef(null)

    const [moveQuery, setMoveQuery] = useState("")
    const [evoQuery, setEvoQuery] = useState("")
    const [wantedEvoQuery, setWantedEvoQuery] = useState("")

    const getPartners = async () => {
        if (account) {
            const partnersData = await partnerQueries.getPartnersListData(
                account.id,
                query
            )
            if (partnersData) {
                console.log(partnersData)
                setPartners(partnersData)

            }
            if (results.current) {
                results.current.scrollIntoView({ behavior: 'smooth' });
            }
            setRefresh(false)
            resetQuery()
        }
    }

    const adminGetPartners = async () => {
        if (account) {
            const partnersData = await partnerQueries.getPartnersData()
            const userData = await userQueries.getTamerNames()
            console.log(userData)
            if (partnersData) {
                // for (let partner of partnersData) {
                //     const tamer = userData.find(user => user.id === partner.tamer_id)
                //     partner["tamerName"] = tamer.username
                //     console.log(partner)
                // }
                console.log(partnersData)
                setPartners(partnersData)
            }
            if (results.current) {
                results.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, [account]); // Empty dependency array to run only once on mount

    const handleQueryChange = (event) => {
        setQuery({...query, [event.target.name]: event.target.value})
    }

    const handleMoveQueryChange = (event) => {
        setMoveQuery(event.target.value)
    }

    const handleEvoQueryChange = (event) => {
        setEvoQuery(event.target.value)
    }
    const handleEvoChange = (evo) => {
        setQuery({...query, ["digimonName"]: evo.name})
    }

    const handleWantedEvoQueryChange = (event) => {
        setWantedEvoQuery(event.target.value)
    }
    const handleWantedEvoChange = (evo) => {
        setQuery({...query, ["wantedEvoName"]: evo.id})
    }

    const sortMethods = {
        none: { method: (a,b) => a.dateConverted.localeCompare(b.dateConverted) },
        newest: { method: (a,b) => b.dateConverted.localeCompare(a.dateConverted) },
        oldest: { method: (a,b) => a.dateConverted.localeCompare(b.dateConverted) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        ABI_a: { method: (a,b) => a.abi - b.abi },
        ABI_d: { method: (a,b) => b.abi - a.abi },
        stage_a: { method: (a,b) => a.currentForm?.stage?.level - b.currentForm?.stage?.level },
        stage_d: { method: (a,b) => b.currentForm?.stage?.level - a.currentForm?.stage?.level },
        megaOrder: { method: (a,b) => b.megaOrder - a.megaOrder },
        ultraOrder: { method: (a,b) => b.ultraOrder - a.ultraOrder },
    };

    const handleSort = (event) => {
        setSortState(event.target.value);
    };

    const allPartners = partners.sort(sortMethods[sortState].method)
    // partners.filter(partner => partner.name.toLowerCase().includes(query.partnerName.toLowerCase()))
    //     .filter(partner => partner.currentForm.name.toLowerCase().includes(query.digimonName.toLowerCase()))
    //     .filter(partner => query.move? partner.moves.includes(query.move): true)
    //     .filter(partner => query.stage? partner.currentForm.stage.name === query.stage: true)
    //     .filter(partner => query.wantedEvoName? partner.wantedEvos.includes(query.wantedEvoName): true)
    //     .sort(sortMethods[sortState].method)

    const moveNamesList = Object.entries(moveNames).map(([id, name]) => ({ id, name }));
    const moveQueriedList = moveQuery ? moveNamesList.filter(move => move.name.toLowerCase().includes(moveQuery.toLowerCase())): []

    const evoQueriedList = evoQuery ? fullDigimonList.filter(digimon => digimon.name.toLowerCase().includes(evoQuery.toLowerCase())): []
    const wantedEvoQueriedList = wantedEvoQuery ? fullDigimonList.filter(digimon => digimon.name.toLowerCase().includes(wantedEvoQuery.toLowerCase())): []

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
    const resetQuery = () => {
        setQuery({
            partnerName: "",
            digimonName: "",
            wantedEvoName: "",
            move: "",
            stage: "",
        })
        setMoveQuery("")
        setEvoQuery("")
        setWantedEvoQuery("")
    }


    return (
        <div className="cyberspace">
            <div className="flex-items">
                <h1 className='white'>Partner Search</h1>
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

            <span>
                <div>
                    <h5 className="label white">Current Form </h5>
                    <input
                        className="builder-input"
                        type="text"
                        placeholder=" Current Form"
                        onChange={handleEvoQueryChange}
                        value={evoQuery}>
                    </input>
                </div>
                <div className={evoQueriedList.length > 0? "partner-scrollable2" : "none"}>
                    {evoQueriedList.map((evo, index) => {
                        return(
                            <h3 className={evo.name == query.digimonName? "white pointer selected": "white pointer"}
                                onClick={() => handleEvoChange(evo)}
                            >{evo.name}</h3>
                        )
                    })}
                </div>
            </span>
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
                            <h3 className={move.name == query.move? "white pointer selected": "white pointer"}
                                onClick={() => setQuery({...query, ["move"]: move.name})}
                            >{move.name}</h3>
                        )
                    })}
                </div>
            </span>
            <span>
                <div>
                    <h5 className="label white">Wanted Evolution</h5>
                    <input
                        className="builder-input"
                        type="text"
                        placeholder=" Digimon Name"
                        onChange={handleWantedEvoQueryChange}
                        value={wantedEvoQuery}>
                    </input>
                </div>
                <div className={wantedEvoQueriedList.length > 0? "partner-scrollable2" : "none"}>
                    {wantedEvoQueriedList.map((evo, index) => {
                        return(
                            <h3 className={evo.id == query.wantedEvoName? "white pointer selected": "white pointer"}
                                onClick={() => handleWantedEvoChange(evo)}
                            >{evo.name}</h3>
                        )
                    })}
                </div>
            </span>
            <h5 className="label white">Sort By</h5>
            <select
                className="builder-select margin-bottom-20p"
                type="text"
                placeholder=" Sorted By"
                value={sortState}
                onChange={handleSort}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">A-Z</option>
                <option value="stage_a">Stage Asc.</option>
                <option value="stage_d">Stage Desc.</option>
                <option value="ABI_a">ABI Asc.</option>
                <option value="ABI_d">ABI Desc.</option>
                <option value="megaOrder">Mega Order</option>
                <option value="ultraOrder">Ultra Order</option>
            </select>
            <br/>
            <button
                className="margin-bottom-20p margin-top-20p"
                onClick={resetQuery}
            >
                Reset Filters
            </button>
            <button
                className="margin-bottom-20p margin-top-20p"
                onClick={() => getPartners()}
            >
                Search
            </button>
            {account && account.roles.includes("admin")?
                <button
                    className="margin-bottom-20p margin-top-20p"
                    onClick={() => adminGetPartners()}
                >
                    All Partners
                </button>: null
            }
            <h3 className='white pointer'
                onClick={() => getPartners()}
            >{refresh? "Search again to refresh your results": null}</h3>
            {allPartners && allPartners.length > 0?
                <h2 className='white'>
                    Showing {allPartners.length > 1 ? `${allPartners.length} Partners` : "1 Partner"}
                </h2>: null
            }
            {allPartners.length > 0?
                <div className="list-grid3" ref={results}>
                    {allPartners.map((partner, index) => {
                        return(
                            <NavLink
                                to={`/partner/${partner.id}`}
                                className="navlink"
                            >
                                <div className='digiBox pointer'
                                style={{marginTop: index < 0 ? "10px": "",
                                marginBottom: index < allPartners.length - 1 ? "10px": "" }}
                                >
                                    <img className='dotImage' src={partner.imageData} />
                                    <h1 className='white'>{partner.name}</h1>
                                    <h2 className='white'>Tamer Name: {partner.tamerName}</h2>
                                    <h2 className='white'>Current Form: {partner.currentForm.name}</h2>
                                    <h2 className='white'>ABI: {partner.abi}</h2>
                                    <h2 className='white'>Date Converted: {partner.dateConverted}</h2>
                                    <h2 className='white'>Mega Order: {partner.megaOrder}</h2>
                                    <h2 className='white'>Ultra Order: {partner.ultraOrder}</h2>
                                </div>
                            </NavLink>
                        )})
                    }
                </div>: null
            }
        </div>
    );
}

export default PartnersList;
