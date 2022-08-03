import { getAgentId } from "helper"
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AnyAction } from 'redux';

export const getAgentID =  ()=> {
// const dispatch = useDispatch()
  
        return{
            type:"GET_AGENT_ID",
            payload:{
                agent_id:24
            }
        }
        // dispatch({
        //     type:"GET_AGENT_ID",
        //     payload:{
        //         agent_id:24
        //     }
        // })
                
            
            
            
        

}



// export const getAgentID =  ()=> {



//     // const agent_id = await getAgentId();
//     return{
//         type:"GET_AGENT_ID",
//         payload:{
//             agent_id:24
//         }
//     }
//     // dispatch({
//     //     type:"GET_AGENT_ID",
//     //     payload:{
//     //         agentID:24
//     //     }
//     // })
        
        
        
        
    

// }

