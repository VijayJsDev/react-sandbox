function FoodItemPage({ meals }) {
  return (
    <>
      <h1>Food Items</h1>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <p>Name: {meal.name}</p>
            <p>Description: {meal.description}</p>
            <p>Price: {meal.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
export default FoodItemPage;
