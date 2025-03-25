import { useEffect } from 'react';
import { useState } from 'react';
import Head from './Header';

function App() {
  const initialCards = [];
  const [cards, setCards] = useState(initialCards);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=6', {
          mode: 'cors',
        });
        const data = await response.json();
        setCards([
          [data.cards[0].image],
          [data.cards[1].image],
          [data.cards[2].image],
          [data.cards[3].image],
          [data.cards[4].image],
          [data.cards[5].image],
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      setCards(initialCards);
    };
  }, []);

  function cardClick(index, card) {
    if (card[1] == 'yes') {
      setPoints(0);
      return;
    }
    const nextCards = cards.map((card, i) => {
      if (i == index) {
        return [...card, 'yes'];
      } else {
        return card;
      }
    });
    setCards(nextCards);
    setPoints(points + 1);
  }

  // Test branch tester
  return (
    <>
      <Head point={points} />
      {cards.map((card, i) => {
        return <img key={card[0]} src={card[0]} alt="" onClick={() => cardClick(i, card)} />;
      })}
    </>
  );
}
export { App };
