import CardImage from "../atoms/CardImage";
import Button from "../atoms/Button";

function CardInfo({ card, addCard }) {
  if (!card) {
    return null;
  }

  return (
    <div>
      <h3>{card.name}</h3>
      <CardImage card={card} />
      <p>Tipo: {card.type}</p>
      <p>Attributo: {card.attribute}</p>
      <p>Level: {card.level}</p>
      <p>Descrizione: {card.description}</p>
      <Button onClick={() => addCard(card)}>Add to Deck</Button>
    </div>
  );
}

export default CardInfo;
