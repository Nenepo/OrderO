import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
function Meals() {
// checking the network tab is essential when using api's so you  can see what might be happening 
  const {
    data: fetchedMeals,
    isLoading,
    error
  } = useHttp('/api/meals', requestConfig , [])
// created an api folder so   Vercel will automatically detect the API routes inside the api folder and handle the requests for you.

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>

  }
  if(error){
    return <Error title="failed to fetch meals" message={error}></Error>
  }
  return (
    <ul id="meals">
      {fetchedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}

export default Meals;
