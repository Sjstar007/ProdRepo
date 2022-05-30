import  {combineReducers} from 'redux';
import cardDataReducer from './cardDataReducer';
const rootReducer = combineReducers({
    card_data: cardDataReducer
})
export default rootReducer;