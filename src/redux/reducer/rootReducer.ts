import { combineReducers } from "redux";
import noteReducer from "./noteReducer";
import userReducer from "./userReducer";
import noteGroupReducer from "./noteGroupReducer";

  

const rootReducer =  combineReducers({
    note:noteReducer,
    user:userReducer,
    noteGroup:noteGroupReducer
})

export default rootReducer