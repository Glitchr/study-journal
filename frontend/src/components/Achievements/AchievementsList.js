import { useState, useEffect } from "react";

import Achievement from "./Achievement";


function AchievementsList({ client }) {
  const [achievements, setAchievements] = useState([]);

  useEffect( async () => {
    try {
      const response = await client.get('/api/achievements/', {}, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setAchievements(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
   <div>
    <h1>Achievements</h1>
    {achievements.map(achievement => (
      <Achievement key={achievement.id} achievement={achievement} />
    ))}
   </div> 
  );
}

export default AchievementsList;
