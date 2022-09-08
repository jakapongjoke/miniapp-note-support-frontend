import {Dispatch} from "redux";
import axios from "axios";
import { NoteDispatchTypes } from "./noteActionTypes";
import { NOTE_LOADING } from "./noteActionTypes";
import { getData } from "helper";
import { AnyAction } from "redux";
import { clearNoteGroup } from "./noteGroupAction";
import { useDispatch } from "react-redux";
export const LIST_PAGE = 'LIST_ITEM'

export const editNote =  (noteId:String,description:String)=>{

return {
      type: 'NOTE_EDIT',
     payload:{
          _id:noteId,
      description:description,
      status:"edit"
     }

}




}



export const filterNote =  (agentId:Number,groupId:String)=>{

     return {
                 type: 'NOTE_FILTER',
                payload:{
                 agent_id:agentId,
                 group_id:groupId,
                 status:"filter"
                }
           
           }
           
           
           
           
           }

export const deleteNoteItem =  (agentId:Number,groupId:String)=>{

     return {
                 type: 'NOTE_DELETE',
                payload:{
                 agent_id:agentId,
                 group_id:groupId,
                 status:"delete_note"
                }
           
           }
           
           
           
           
           }


export const listNote =  (agentId:Number,groupId:String)=>{
  
return {
            type: 'NOTE_LIST',
           payload:{
            agent_id:agentId,
            group_id:groupId,
            status:"listing"
           }
      
      }
      
      
      
      
}

      




export const UpdateImageNoteEditor =  (content:String)=>{

return {
            type: 'NOTE_UPDATE_IMAGE_EDITOR',
           payload:{
               description:content,
            status:"update_image_in_editor"
           }
      
      }
      
      
      
      
      }
      
export const viewNote = (noteId:String,description:String)=>{
     return {
          type:'NOTE_VIEW',
          payload:{
               id:"",
               note_title:"",
               description:"",

          }
     }
}

export const manageNoteGroup = (agentId:Number)=>{
     return {
         type: 'NOTE_GROUP_MANAGE',
         payload:{
              agent_id:agentId,
          status:"note_group_manage"
         }
     }
 }



 export const addNote =  (agentId:Number,groupId:String|null)=>{
  
     return {
                 type: 'NOTE_ADD',
                payload:{
                 agent_id:agentId,
                 group_id:groupId,
                 status:"add_note"
                }
           
           }
           
           
           
           
     }
     

 