import { CDN_URL } from "../utils/constants";
const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, costForTwo, sla ,cloudinaryImageId } = resData.card.card.info;

  return (
    <div className="h-full border-2 border-black px-2 pt-2 pb-2 bg-orange-200 hover:bg-orange-300">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <div className="px-4 pb-4 pt-4 font-mono">
      <h3 className="font-bold">{name}</h3>
      <h4>Cuisines : {cuisines.join(", ")}</h4>
      <h4>Rating : {avgRating}</h4>
      <h4>₹{costForTwo/100}</h4>
      <h4>{sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;