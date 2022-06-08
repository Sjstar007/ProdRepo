import  {combineReducers} from 'redux';
import cardDataReducer from './cardDataReducer';
import userDataReducer from "./userDataReducer";
const rootReducer = combineReducers({
    card_data: cardDataReducer,
    user_data: userDataReducer
})
export default rootReducer;