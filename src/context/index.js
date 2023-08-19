import { createContext } from "react";

const AppContext = createContext({
  searchText: "",
  filteredRestaurants: [],
  allRestaurants: [],
});

export default AppContext;
