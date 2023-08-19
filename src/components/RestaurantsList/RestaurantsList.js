import { useEffect, useContext, useRef } from "react";
import AppContext from "../../context";
import Shimmer from "../Shimmer.js/Shimmer";
import "./RestaurantsList.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { Link } from "react-router-dom";
import { fetch_restaurants, filter_restaurants } from "../../constants/actions";

const RestaurantsList = () => {
  const [state, dispatch] = useContext(AppContext);
  const { filteredRestaurants, allRestaurants, searchText } = state;
  const isLoaded = useRef(false);

  const getRestaurants = async (lat, long) => {
    const API_URL =
      lat && long
        ? `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`
        : `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.591945&lng=73.73897649999999&page_type=DESKTOP_WEB_LISTING`;
    const data = await fetch(API_URL);
    const restaurantsList = await data.json();

    const restaurants =
      restaurantsList?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
      restaurantsList?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    dispatch({ type: fetch_restaurants, restaurants: restaurants });
    dispatch({ type: filter_restaurants, restaurants: restaurants });
    isLoaded.current = !!restaurants;
  };

  const filterRestaurants = () => {
    if (searchText) {
      const filtered = allRestaurants?.filter((restaurant) =>
        restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      dispatch({ type: filter_restaurants, restaurants: filtered });
    } else {
      dispatch({ type: filter_restaurants, restaurants: allRestaurants });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getRestaurants(latitude, longitude);
      },
      (error) => {
        if (error === error.PERMISSION_DENIED) getRestaurants();
      }
    );
  }, []);

  useEffect(() => {
    if (isLoaded.current) filterRestaurants();
  }, [searchText]);

  return (
    <div className="restaurants-list">
      {filteredRestaurants?.length > 0
        ? filteredRestaurants?.map((restaurant) => {
            return (
              <Link
                to={`/restaurant/${restaurant?.info?.id}`}
                key={restaurant?.info?.id}
              >
                <RestaurantCard restaurant={restaurant} />
              </Link>
            );
          })
        : Array(10)
            .fill("")
            .map((x, i) => <Shimmer key={i} />)}
    </div>
  );
};

export default RestaurantsList;
