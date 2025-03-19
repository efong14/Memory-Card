import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=6', {
          mode: 'cors',
        });
        const data = await response.json();
        setCards(data.cards[0].image);
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      setCards(null);
    };
  }, []);

  return (
    <>
      <img src={cards} alt="" />
    </>
  );
}

export { App };
