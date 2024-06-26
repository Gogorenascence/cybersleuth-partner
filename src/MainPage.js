import { useContext } from "react";
import PartnersRow from "./Display/PartnerRow";
import { AuthContext } from "./Context/AuthContext";
// import partnerQueries from "./Partners/PartnerQueries";


function MainPage({
  fullDigimonList
}) {

  const {account} = useContext(AuthContext)

    return (
      <div className="cyberspace">
        <div className="aligned">
          <h1 className='white'>Cyber Sleuth Partner</h1>
          <h2 className='white'>Partner Digimon Manager</h2>
        </div>
        {account?
          <PartnersRow
            fullDigimonList={fullDigimonList}
          />:
          <div className='aligned margin-top-xp'>
            <h1 className="white">Sign Up or Login</h1>
          </div>
        }
        {/* <button
          onClick={() => partnerQueries.transferAllPartners()}
        >Transfer All</button> */}
        {/* <h1 className="media-title">Welcome to PlayMaker CardBase</h1>
        <h2 className="media-title">The PlayMaker Card Database and Deck Sharing Site</h2>
        <br/>
        <div>
          <TopRow/>
        </div>
        <div className="margin-top-20 none">
          <SimulatorRow/>
        </div>
        <br/>
        <h1 className="margin-top-20">CardBase News</h1>
        <br/>
        <div>
          <NewsRow articles={articles}/>
        </div>
        <br/>
          <h1 className="margin-top-20">Latest Decks</h1>
        <br/>
        <div>
          <DeckRow/>
        </div>
        <br/>
          <h1 className="margin-top-20 media-margin-bottom-none">Latest Cards</h1>
        <br/>
        <div>
          <CardRow cards={cards}/>
        </div> */}
      </div>
    );
  }

  export default MainPage;
