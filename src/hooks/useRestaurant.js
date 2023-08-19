import { useEffect, useState } from "react";

const useRestaurant = (
  SWIGGY_MENU_API_URL,
  resId,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY
) => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      const response = await fetch(SWIGGY_MENU_API_URL + resId);
      if (!response.ok) {
        const err = response.status;
        throw new Error(err);
      } else {
        const json = await response.json();

        const restaurantData =
          json?.data?.cards
            ?.map((x) => x.card)
            ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
            ?.info || null;
        setRestaurant(restaurantData);

        const menuItemsData =
          json?.data?.cards
            .find((x) => x.groupedCard)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
              (x) => x.card?.card
            )
            ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
            ?.map((x) => x.itemCards)
            .flat()
            .map((x) => x.card?.info) || [];

        const uniqueMenuItems = [];
        menuItemsData.forEach((item) => {
          if (!uniqueMenuItems.find((x) => x.id === item.id)) {
            uniqueMenuItems.push(item);
          }
        });
        setMenuItems(uniqueMenuItems);
      }
    } catch (err) {
      setMenuItems([]);
      setRestaurant(null);
    }
  };
  return [restaurant, menuItems];
};

export default useRestaurant;
