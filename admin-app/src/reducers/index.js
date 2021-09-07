import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducer from "./user.reducer";
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';

const rootReducer=combineReducers({
    auth:authReducers,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    order:orderReducer
})


export default rootReducer;