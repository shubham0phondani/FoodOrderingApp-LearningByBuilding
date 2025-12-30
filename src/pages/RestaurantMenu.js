import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "../components/Shimmer";

import { useParams } from "react-router";


const RestaurantMenu = () => {

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) {
    return (
      <Shimmer />
    )
  }

  const { name, cuisines, costForTwoMessage } = resInfo;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines.join(",")}</h3>
      <h3>{costForTwoMessage}</h3>
      <ul>
        {resInfo.items.map((item) => (
          <li key={item.id}>{item.name} - Rs{item.price / 100}</li>
        ))}
      </ul>
    </div>
  )
  
};

export default RestaurantMenu;