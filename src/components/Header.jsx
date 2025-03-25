export default function Header({ point, hPoints }) {
  return (
    <section>
      <div className="score">Score: {point}</div>
      <div className="hScore">High Score: {hPoints}</div>
    </section>
  );
}
