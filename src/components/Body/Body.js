import { useContext, useReducer, useState } from "react";
import RestaurantsList from "../RestaurantsList/RestaurantsList";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import AppContext from "../../context";
import {
  filter_restaurants,
  search_text,
  fetch_restaurants,
} from "../../constants/actions";
import "./Body.scss";

const Body = () => {
  const context = useContext(AppContext);
  const [showFilters, setShowFilters] = useState(false);

  const reducer = (state, action) => {
    if (action.type === filter_restaurants) {
      return {
        ...state,
        filteredRestaurants: action.restaurants,
      };
    } else if (action.type === search_text) {
      return {
        ...state,
        searchText: action.searchText,
      };
    } else if (action.type === fetch_restaurants) {
      return {
        ...state,
        allRestaurants: action.restaurants,
      };
    }
  };

  const [appState, dispatch] = useReducer(reducer, context);

  const handleClose = () => {
    setShowFilters(!showFilters);
  };

  return (
    <AppContext.Provider value={[appState, dispatch]}>
      <section className="body">
        <SearchBar />
        <button className="filter-btn" onClick={() => handleClose()}>
          Filters
        </button>
        {showFilters && <Filters handleClose={handleClose} />}
        <RestaurantsList />
      </section>
    </AppContext.Provider>
  );
};

export default Body;
