import { useEffect, useState } from "react";
import Shimmer from "../components/Shimmer";
import mockMenus from "../utils/mockMenusData";
import { useParams } from "react-router";
const RestaurantMenu = () => {

  const [resInfo , setResInfo] = useState(null);

  const {resId} = useParams();

    useEffect(() =>{
        mockData();
    } , [resId]);

const mockData = () => {
      const res = mockMenus.find((data)=>{
        return data.restaurantId === resId;
      })
      setResInfo(res);
      console.log(resInfo);
  };

    if(!resInfo){
     return (
      <Shimmer/>
      )
    }

    const {name, cuisines, costForTwoMessage} = resInfo;
    
    return(
      <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines.join(",")}</h3>
            <h3>{costForTwoMessage}</h3>
            <ul>
              {resInfo.items.map((item)=>(
                <li key={item.id}>{item.name} - Rs{item.price/100}</li>
              ))}
            </ul>
        </div>
      )
};

export default RestaurantMenu;