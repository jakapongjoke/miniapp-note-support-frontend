import { useDispatch } from "react-redux"

export const manageNoteGroup = (agentId:Number)=>{
    return {
        type: 'NOTE_GROUP_MANAGE',
        payload:{
             agent_id:agentId,
         status:"note_group_manage"
        }
    }
}
const NOTE_GROUP_EDIT_DATA:String = 'NOTE_GROUP_EDIT_DATA'

export const EditNoteGroup = (NoteId:String,agentId:Number)=>{
    
    return { 
        type:NOTE_GROUP_EDIT_DATA,
        payload:{
            _id:NoteId,
            agent_id:agentId,
            status:"note_group_edit_data"

        }
    }

}
const NOTE_GROUP_BACK:String = 'NOTE_GROUP_BACK'

export const backAction = (status_action:String,type_action:String)=>{
    return { 
        type:type_action,
        payload:{
            _id:"",
            agent_id:"",
            status:status_action

        }
    }

}


const NOTE_GROUP_CLEAR:String = 'NOTE_GROUP_CLEAR'

export const clearNoteGroup = ()=>{
    
    return { 
        type:NOTE_GROUP_CLEAR,
        payload:{
            _id:"",
            agent_id:"",
            status:""

        }
    }

}