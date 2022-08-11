import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AnyAction } from 'redux';
import { RootStore } from "redux/store";

export  function setAgentID(agentId:Number=0){
    return {
        type: 'SET_AGENT_ID',
        payload: {
        agent_id: agentId, 
        // "agent_name": "Demo Note", 
        // "agent_profile_picture": "https://s3-ap-southeast-1.amazonaws.com/warroom-sg/default_c7026bb04f767541443f7419238e67be.svg", 
        // "agent_employee_id": "", 
        // "agent_client_id": 70, 
        // "agent_status": "active" 
        }
    }
}