import { useEffect, useState } from "react";
import mockMenus from "../utils/mockMenusData";
const useRestaurantMenu = (resId) =>{
    const [resInfo , setResInfo] = useState(null);
    useEffect(() =>{
        mockData();
    } , [resId]);
    
    const mockData = () => {
      const res = mockMenus.find((data)=>{
        return data.restaurantId === resId;
      })
      setResInfo(res);
  };

    return resInfo;
}

export default useRestaurantMenu;