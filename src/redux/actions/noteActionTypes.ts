export const NOTE_LOADING = "NOTE_LOADING";
export const NOTE_FAIL = "NOTE_FAIL";
export const NOTE_SUCCESS = "NOTE_SUCCESS";



export type NoteType = {
    "_id": {
        "_id": String
      },
      "thread_name": String,
      "thread_description": String,
      "group_id": {
          "$oid": String
        },
      "group_info": {
          "$oid": String
        },
      "agent_id": Number,
  
}
export interface NOTE_LOADING {
    type: typeof NOTE_LOADING
  }
  
  export interface NOTE_FAIL {
    type: typeof NOTE_FAIL
  }
  
  export interface NOTE_SUCCESS {
    type: typeof NOTE_SUCCESS,
    payload: NoteType
  }
  
export type NoteDispatchTypes = NOTE_SUCCESS