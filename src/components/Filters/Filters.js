import { useContext, useState } from "react";
import AppContext from "../../context";
import { filter_restaurants } from "../../constants/actions";

import "./Filters.scss";

const Filters = ({ handleClose }) => {
  const [state, dispatch] = useContext(AppContext);
  const { allRestaurants } = state;

  const [sortBy, setSortBy] = useState("");
  const [cuisines, setCuisines] = useState([]);

  const cuisineList = [
    ...new Set(allRestaurants?.map((rest) => rest.info.cuisines)),
  ];

  const cuisinesList = [...new Set(cuisineList.flat())];

  const applyFilters = () => {
    let sortedRestaurants = allRestaurants;
    if (sortBy === "rating") {
      sortedRestaurants.sort((a, b) => b.info.avgRating - a.info.avgRating);
    } else if (sortBy === "delivery") {
      sortedRestaurants.sort(
        (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
      );
    } else if (sortBy === "cost-lowtohigh") {
      sortedRestaurants.sort(
        (a, b) =>
          a.info.costForTwo.match(/(\d+)/)[0] -
          b.info.costForTwo.match(/(\d+)/)[0]
      );
    } else if (sortBy === "cost-hightolow") {
      sortedRestaurants.sort(
        (a, b) =>
          b.info.costForTwo.match(/(\d+)/)[0] -
          a.info.costForTwo.match(/(\d+)/)[0]
      );
    }

    if (cuisines?.length) {
      sortedRestaurants = sortedRestaurants.filter((restro) => {
        const a = restro.info.cuisines.filter(
          (x) => cuisines.filter((y) => y.value === x).length > 0
        );
        return a?.length > 0;
      });
    }

    handleClose();
    dispatch({ type: filter_restaurants, restaurants: sortedRestaurants });
  };

  const onSortRadioChange = (e) => {
    setSortBy(e.target.value);
  };

  const onCuisineChange = (e) => {
    let newCuisines = cuisines;
    debugger;
    if (e.target.checked) {
      newCuisines.push({ value: e.target.value, checked: true });
    } else {
      newCuisines = newCuisines.filter((x) => x.value !== e.target.value);
    }
    setCuisines(newCuisines);
  };

  return (
    <div className="filters">
      <div className="sort">
        <h3>Sort By</h3>
        <div className="sort-options">
          <input
            type="radio"
            id="delivery-time"
            name="sort"
            value="delivery"
            onChange={onSortRadioChange}
            checked={sortBy === "delivery"}
          />
          <label htmlFor="delivery-time">Delivery Time</label>

          <input
            type="radio"
            id="rating"
            name="sort"
            value="rating"
            onChange={onSortRadioChange}
            checked={sortBy === "rating"}
          />
          <label htmlFor="rating">Rating</label>

          <input
            type="radio"
            id="cost-lowtohigh"
            name="sort"
            value="cost-lowtohigh"
            onChange={onSortRadioChange}
            checked={sortBy === "cost-lowtohigh"}
          />
          <label htmlFor="cost-lowtohigh">Cost - Low to High</label>

          <input
            type="radio"
            id="cost-hightolow"
            name="sort"
            value="cost-hightolow"
            onChange={onSortRadioChange}
            checked={sortBy === "cost-hightolow"}
          />
          <label htmlFor="cost-hightolow">Cost - High to Low</label>
        </div>
      </div>

      <div className="cuisines">
        <h3>Filter by Cuisines</h3>
        {cuisinesList.map((cuisine, index) => {
          return (
            <div className="cuisine-item" key={index}>
              <input
                type="checkbox"
                id={`Cuisines-${index}`}
                name="Cuisines"
                value={cuisine}
                onChange={onCuisineChange}
                checked={cuisines.find((x) => x.value === cuisine)?.checked}
              ></input>
              <label htmlFor={`Cuisines-${index}`}>{cuisine}</label>
            </div>
          );
        })}
      </div>

      <div className="filter-buttons">
        <button className="apply-button" onClick={() => applyFilters()}>
          Apply
        </button>

        <button className="close-button" onClick={() => handleClose()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Filters;
