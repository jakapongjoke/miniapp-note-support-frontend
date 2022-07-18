import {Dispatch} from "redux";
import axios from "axios";
import { NoteDispatchTypes } from "./noteActionTypes";
import { NOTE_LOADING } from "./noteActionTypes";
import { getData } from "helper";
import { AnyAction } from "redux";
export const LIST_PAGE = 'LIST_ITEM'

export const editNote =  (noteId:String)=>{

return {
      type: 'NOTE_EDIT',
     payload:{
      id:noteId,
      status:"edit"
     }

}




}


export const listNote =  (agentId:Number)=>{

return {
            type: 'listing',
           payload:{
            agentId:120,
            status:"listing"
           }
      
      }
      
      
      
      
      }
      
