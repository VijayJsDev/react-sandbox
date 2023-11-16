import React, { useState, useEffect } from "react";
import FoodItemPage from "./FoodItem";

function FoodPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        const response = await fetch(
          "https://react-http-adef4-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        // Convert object of objects to an array
        const mealsArray = Object.values(data);
        setMeals(mealsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFirebaseData();
  }, []);

  return (
    <div>
      <FoodItemPage meals={meals} />
    </div>
  );
}

export default FoodPage;
