import api from '../api/axiosConfig';

export const fetchFighterData = async (name, setFighter) => {
  try {
    const response = await api.get(`/api/fighter/${encodeURIComponent(name)}`);
    setFighter(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchFightHistory = async (name, setFights) => {
  try {
    const response = await api.get(`/api/fights/${encodeURIComponent(name)}`);
    setFights(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const buildEloHistory = (fights) => {
  if (!fights || fights.length === 0) return [];

  const sortedFights = fights.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstFightDate = new Date(sortedFights[0].date);
  const oneDayBefore = new Date(firstFightDate);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);

  return [
    { date: oneDayBefore.toLocaleDateString(), elo: 1000 },
    ...sortedFights.map(f => ({
      date: new Date(f.date).toLocaleDateString(),
      elo: f.fighterPostElo,
    })),
  ];
};

export const renderEloArrow = (lastFight) => {
  if (!lastFight) return null;

  switch (lastFight.result) {
    case "win":
      return <span className="elo-arrow up">▲</span>;
    case "loss":
      return <span className="elo-arrow down">▼</span>;
    case "draw":
    case "nc":
    case "no contest":
      return <span className="elo-arrow neutral">−</span>;
    default:
      return null;
  }
};

export const renderEloChange = (lastFight, eloChange) => {
  if (!lastFight || eloChange === null) return null;

  let symbol, cls;

  if (lastFight.result === "win") {
    symbol = "+";
    cls = "elo-change up";
  } else if (lastFight.result === "loss") {
    symbol = "";
    cls = "elo-change down";
  } else {
    // draw or nc
    symbol = "";
    cls = "elo-change neutral";
    return <span className={cls}>({symbol})</span>;
  }

  return <span className={cls}>( {symbol}{eloChange} )</span>;
};