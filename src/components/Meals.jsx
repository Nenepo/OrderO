import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {}
function Meals() {
// checking the network tab is essential when using api's so you  can see what might be happening 
  const {
    data: fetchedMeals,
    isLoading,
    error
  } = useHttp('https://order-hywq7enlp-nene-devs-projects.vercel.app/meals', requestConfig , [])


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
