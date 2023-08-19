import { useParams } from "react-router-dom";
import useRestaurant from "../../hooks/useRestaurant";
import {
  SWIGGY_MENU_API_URL,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY,
} from "../../constants";
import "./RestaurantMenu.scss";
import { FiStar } from "react-icons/fi";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurantData, menuItems] = useRestaurant(
    SWIGGY_MENU_API_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );

  return (
    <div className="restaurant-menu">
      <div className="restaurant-menu-header">
        <h2>{restaurantData?.name} </h2>
        <div className="subheading-color">
          {restaurantData?.cuisines?.join(", ")}
        </div>
        <div className="subheading-color">{restaurantData?.locality}</div>
        <div className="restaurant-rating">
          {restaurantData?.avgRating} <FiStar />
        </div>
      </div>

      <h2>Menu</h2>
      <div className="restaurant-menu-items">
        {menuItems.map((item) => {
          const price = (item.price || item.defaultPrice) / 100;
          return (
            <div className="menu-item" key={item.id}>
              <div className="menu-item-info">
                <span>{item.name} </span>
                <span>{price + " ₹"}</span>
              </div>
              <img
                src={
                  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
                  item?.imageId
                }
                alt={item.name}
                className="menu-item-img"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
