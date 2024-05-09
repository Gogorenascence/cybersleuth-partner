import SiteLinks from "./Display/SiteLinks";


function MainPage() {

    return (
      <div>
        <div className="flex-items">
          <h1 className='white'>Cyber Sleuth Partners</h1>
          <SiteLinks/>
        </div>
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
