import { NavLink } from "react-router-dom";


function SiteLinks() {

    return (
        <div>
            <div className="flex-items">
                <NavLink to="/">
                    <h2 className='white'
                        style={{margin: "30px 0 0 25px"}}
                    >Home</h2>
                </NavLink>
                <NavLink to="/partners">
                    <h2 className='white'
                        style={{margin: "30px 0 0 25px"}}
                    >Partners</h2>
                </NavLink>
                <NavLink to="/partnercreate">
                    <h2 className='white'
                        style={{margin: "30px 0 0 25px"}}
                    >Partner Create</h2>
                </NavLink>
                <NavLink to="/digilist">
                    <h2 className='white'
                        style={{margin: "30px 0 0 25px"}}
                    >Digimon List</h2>
                </NavLink>
            </div>
        </div>
    );
}
export default SiteLinks;
