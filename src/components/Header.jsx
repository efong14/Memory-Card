import '../components/Header.css';

export default function Header({ point, hPoints }) {
  return (
    <>
      <header>
        <h1>Memory Card</h1>
      </header>
      <section className="score">
        <div className="score">Score: {point}</div>
        <div className="hScore">High Score: {hPoints}</div>
      </section>
    </>
  );
}
