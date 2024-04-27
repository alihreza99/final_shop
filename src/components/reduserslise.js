import { Userdatas, shop } from "../services/data";
const initState = {
  entities: Userdatas,
  admin: null,
  shopitems: shop,
  prices: 0,
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case "sign":
      const user = action.payload;
      return {
        ...state,
        entities: [...state.entities, user],
        admin: user,
      };
    case "log":
      const login = action.payload;
      return {
        ...state,
        admin: login,
      };
    case "logout":
      console.log("hi");
      return {
        ...state,
        admin: null,
      };
    case "add":
      const item = action.payload;
      return {
        ...state,
        shopitems: [...state.shopitems, item],
      };
    case "delete":
      const deleteduserId = action.payload;
      return {
        ...state,
        entities: state.entities.filter((user) => user?.id !== deleteduserId),
      };
    case "deleteitem":
      const deleteit = action.payload;
      return {
        ...state,
        shopitems: state.shopitems.filter((user) => user?.id !== deleteit),
      };
    case "plus":
      const edit = action.payload;
      return {
        ...state,
        shopitems: state.shopitems?.map((items) => {
          console.log(state.shopitems);
          console.log(items?.id);
          if (items?.id == edit?.fid) {
            return {
              title: items?.title,
              image: items?.image,
              price: items?.price,
              category: items?.category,
              id: items?.id,
              number: 1 + edit?.num,
            };
          }

          return items;
        }),
      };
    case "min":
      const edit2 = action.payload;
      return {
        ...state,
        shopitems: state.shopitems?.map((items) => {
          console.log(state.shopitems);
          console.log(items?.id);
          if (items?.id == edit2?.fid) {
            return {
              title: items?.title,
              image: items?.image,
              price: items?.price,
              category: items?.category,
              id: items?.id,
              number: edit2?.num - 1,
            };
          }

          return items;
        }),
      };
    default:
      return state;
  }
}

export const selectusers = (state) => state.users.entities;
