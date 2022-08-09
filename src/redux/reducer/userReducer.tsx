import { NextFunction } from "express"
import { useDispatch } from "react-redux"

interface userState {
    data:{
        agent_id:Number
    }
    
}
const initialState = {
    data:{
    agent_id:0
}
}

type Action = {type:String,payload:{
    agent_id:Number
   }
}


    const userReducer = (state:userState=initialState ,action:Action)=>{
   switch(action.type){

    case 'SET_AGENT_ID':{
        return  {state, data:action.payload}

    }

    default:
          return state;
      
   }

}
export default userReducer