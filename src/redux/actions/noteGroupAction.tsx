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

export const backToNoteGroup = ()=>{
    return { 
        type:NOTE_GROUP_BACK,
        payload:{
            _id:"",
            agent_id:"",
            status:"back_to_group"

        }
    }

}