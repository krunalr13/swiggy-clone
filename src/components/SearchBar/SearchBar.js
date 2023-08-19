import { useContext } from "react";
import AppContext from "../../context";
import "./SearchBar.scss";
import { search_text } from "../../constants/actions";

const SearchBar = () => {
  const [, dispatch] = useContext(AppContext);

  const onInputChange = (value) => {
    dispatch({ type: search_text, searchText: value });
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Search by restaurant name"
      ></input>
    </div>
  );
};

export default SearchBar;
