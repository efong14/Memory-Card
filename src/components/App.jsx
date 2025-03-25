import { useEffect } from 'react';
import { useState } from 'react';
import Head from './Header';

function App() {
  const initialCards = [];
  const [cards, setCards] = useState(initialCards);
  const [resetCards, setResetCards] = useState();
  const [points, setPoints] = useState(0);

  function shuffleArray(arr) {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  // function shuffleCards() {
  //   let cardIndex = [0, 1, 2, 3, 4, 5];
  //   shuffleArray(cardIndex);
  // }

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=6', {
          mode: 'cors',
        });

        const data = await response.json();
        const cardsData = [
          { image: data.cards[0].image },
          { image: data.cards[1].image },
          { image: data.cards[2].image },
          { image: data.cards[3].image },
          { image: data.cards[4].image },
          { image: data.cards[5].image },
        ];

        setCards(cardsData);
        setResetCards(cardsData);
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
    const nextCards = cards.map((card, i) => {
      if (i == index) {
        return { ...card, clicked: 'yes' };
      } else {
        return card;
      }
    });

    if (card.clicked == 'yes') {
      setPoints(0);
      setCards(shuffleArray(resetCards));
      return;
    }

    setCards(shuffleArray(nextCards));
    setPoints(points + 1);
  }

  return (
    <>
      <Head point={points} />
      {cards.map((card, i) => {
        return <img key={card.image} src={card.image} alt="" onClick={() => cardClick(i, card)} />;
      })}
    </>
  );
}
export { App };
