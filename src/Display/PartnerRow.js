import React, { useState, useEffect, useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import partnerQueries from '../Partners/PartnerQueries';


function PartnersRow({
    fullDigimonList,
}) {

    const {account} = useContext(AuthContext)
    const navigate = useNavigate()

    const [partners, setPartners] = useState([])

    const getPartners = async () => {
        if (account) {
            const partnersData = await partnerQueries.getRangedQueriedPartnersData(5, {tamer_id: account.id})
            if (partnersData) {
                console.log(partnersData)
                setPartners(partnersData)
            }
        }
    }

    useEffect(() => {
        getPartners()
    }, [account]); // Empty dependency array to run only once on mount

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



    return (
        <div>
            { partners && partners.length > 0?
                <>
                    <h1 className="white aligned">Recent Partners</h1>
                    <div className="verticalScrollable margin-bottom-20p">
                        {partners.map((partner, index) => {
                            return(
                                <NavLink
                                    to={`/partner/${partner.id}`}
                                    className="navlink"
                                >
                                    <div className='digiBox2 pointer'
                                        style={{marginTop: index < 0 ? "10px": "",
                                        marginBottom: index < partners.length - 1 ? "10px": "" }}
                                    >
                                        <img className='dotImage' src={partner.imageData} />
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
                    <button
                        className="xx-large-button"
                        onClick={() => navigate("/partners")}
                    >
                        See All Partners
                    </button>
                </>:
                <div className='aligned margin-top-xp'>
                    <h1 className="white">You have no created partners</h1>
                    <NavLink to={"partnercreate"} className="navlink">
                        <h2 className="white">Head to Partner Create!</h2>
                    </NavLink>
                </div>
            }
        </div>
    );
}

export default PartnersRow;
