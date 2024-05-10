import React, { useState, useEffect } from 'react';
import partnersQueries from './PartnerQueries';
import { NavLink } from 'react-router-dom';
import SiteLinks from '../Display/SiteLinks';

function PartnersList({
    fullDigimonList
}) {

    const [partners, setPartners] = useState([])

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

    // const allDigimon = partners.filter(digimon => digimon.name.toLowerCase().includes(query.digimonName.toLowerCase()))
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
        <div>
            <div className="flex-items">
                <h1 className='white'>Partner List</h1>
                <SiteLinks/>
            </div>
            <div className="list-grid3">
                {partners.map((partner, index) => {
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
