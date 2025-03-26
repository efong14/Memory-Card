import '../components/Header.css';

export default function Header({ point, hPoints }) {
  return (
    <section className="header">
      <div className="score">Score: {point}</div>
      <div className="hScore">High Score: {hPoints}</div>
    </section>
  );
}
