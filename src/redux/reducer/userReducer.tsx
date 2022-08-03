import { NextFunction } from "express"
import { useDispatch } from "react-redux"

interface userState {
        agent_id:Number

    
}
const initialState = {
    agent_id:24
}

type Action = {type:String,payload:{
    agent_id:Number
   }}
    const userReducer = (state:userState=initialState ,action:Action)=>{
   switch(action.type){
    case "GET_AGENT_ID":
    return  [state, action.payload]
  
      
   }

}
export default userReducer