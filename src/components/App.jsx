import { useEffect } from 'react';
import { useState } from 'react';
import Head from './Header';
import './App.css';

function App() {
  const initialCards = [];
  const [cards, setCards] = useState(initialCards);
  const [resetCards, setResetCards] = useState();
  const [points, setPoints] = useState(0);
  const [hPoints, setHPoints] = useState(0);

  function shuffleArray(arr) {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=12', {
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
          { image: data.cards[6].image },
          { image: data.cards[7].image },
          { image: data.cards[8].image },
          { image: data.cards[9].image },
          { image: data.cards[10].image },
          { image: data.cards[11].image },
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
    if (card.clicked == 'yes') {
      setPoints(0);
      setCards(shuffleArray(resetCards));
      return;
    }

    const nextCards = cards.map((card, i) => {
      if (i == index) {
        return { ...card, clicked: 'yes' };
      } else {
        return card;
      }
    });

    setCards(shuffleArray(nextCards));
    setPoints(points + 1);

    if (hPoints <= points) {
      setHPoints(points + 1);
    }
  }

  return (
    <>
      <section className="container">
        <Head point={points} hPoints={hPoints} />
        <div className="cardContainer">
          {cards.map((card, i) => {
            return (
              <img key={card.image} src={card.image} alt="" onClick={() => cardClick(i, card)} />
            );
          })}
        </div>
      </section>
    </>
  );
}
export { App };
