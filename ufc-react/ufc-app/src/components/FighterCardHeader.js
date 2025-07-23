import "../styles/FighterCardHeader.css"

const FighterCardHeader = ({ name, wins, losses, draws, ncs }) => (
    <div className="fighter-name-record">
      <h1>{name}</h1>
      <p>{wins} - {losses} - {draws} ({ncs} NC)</p>
    </div>
  );
  
  export default FighterCardHeader;