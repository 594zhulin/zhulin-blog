import { combineReducers } from 'redux';
import blogReducer from '../containers/Home/reducer';
const reducer = combineReducers({
  blog: blogReducer
});

export default reducer;