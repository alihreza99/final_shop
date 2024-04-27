import { combineReducers } from "redux";
import Reducer from "../components/reduserslise";

const rootReducer = combineReducers({
  auth: Reducer,
});

export default rootReducer;
