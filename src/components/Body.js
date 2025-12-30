// import resobj from "../utils/mockData"
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    // console.log("Again ?");

    const [listofRestaurant , setListofRestaurant] = useState([]);
    const [filteredData , setfilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
            fetchData();
    },[])
    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9352403&lng=77.624532&str=North%20Indian&trackingId=a1b6b06f-84b5-7aaa-1558-8d980c5e27b9&submitAction=ENTER&queryUniqueId=388f7314-c434-1e0c-dbf5-ed38681b7e45"
        );
        const json = await data.json();
        //Optional Chaining
        const chunck = json?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
        setListofRestaurant(chunck);
        setfilteredData(chunck)
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false){
        return <h1>Looks like you're offline!! Please check your internet connection...</h1>
    };

    return (
        <>
        {/* rendering on the base of condition is Conditional rendering */}
        {listofRestaurant.length === 0 ?
            <div className="body">
                <Shimmer />
            </div>
            :
            <div className="body">
                <div className="filterr">
                    <div className="search">
                        <input type="text" className="search-box" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                        <button onClick={()=>{
                            
                            const filteredRestaurant = listofRestaurant.filter((res)=>
                                res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setfilteredData(filteredRestaurant)

                        }}>
                            Search
                        </button>
                    </div>
                    <button
                    onClick={()=>{
                        const filteredList = listofRestaurant.filter((data)=>{
                        return data.card.card.info.avgRating > 4.3;
                    })
                        setfilteredData(filteredList);
                    }
                    } 
                    className="filter-btn">Top Rated Restaurant
                    </button>
                </div>
                <div className="res-container">
                    {filteredData.map((data)=>{
                        return ( 
                        <Link className="linkedIn" to={"/restaurants/" + data.card.card.info.id} key={data.card.card.info.id}>
                            <RestaurantCard  resData={data}/>
                        </Link> 
                        ) 
                    })}
                </div>
            </div>}
        </>
    )
}
// 2:10:31
export default Body