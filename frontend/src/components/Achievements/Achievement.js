


function Achievement({ achievement }) {
  return (
    <div>
      <img src={achievement.badge} alt={achievement.name} />
      <h2>{achievement.name}</h2>
      <p>{achievement.description}</p>
    </div>
  );
}

export default Achievement;
