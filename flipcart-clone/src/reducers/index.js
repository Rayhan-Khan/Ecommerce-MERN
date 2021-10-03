import { combineReducers } from "redux";
import authReducers from "./auth.reducer";
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';


const rootReducer=combineReducers({
    category:categoryReducer,
    product:productReducer,
    auth:authReducers
})


export default rootReducer;