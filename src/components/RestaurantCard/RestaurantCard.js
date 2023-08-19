import "./RestaurantCard.scss";
import { FiStar } from "react-icons/fi";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div key={restaurant?.info?.id} className="restaurant-card">
      <img
        src={
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
          restaurant?.info?.cloudinaryImageId
        }
        alt={restaurant?.info?.name}
        className="restaurant-image"
      />
      <div>{restaurant?.info?.name}</div>
      <div className="rating">
        {restaurant?.info?.avgRatingString} <FiStar />
      </div>
      <div>{restaurant?.info?.cuisines?.join(", ")}</div>
    </div>
  );
};

export default RestaurantCard;
