export interface ListNoteItemInterface {  
  thread_data: {
  _id:String,
  thread_name: String,
  thread_topic : String,
  thread_description : String,
  thread_group:String,
  agent_id: Number,
  group_id: Object,
  group_info: {
    group_name: String,
    agent_id: Number,
    thread_name:String,
    group_color: String,
  }
 }[]
  }
  export interface NoteItemInterface {  

    _id:String,
    thread_name: String,
    thread_topic : String,
    thread_description : String,
    thread_group:String,
    agent_id: Number,
    group_id: Object,
    group_info: {
      group_name: String,
      agent_id: Number,
      thread_name:String,
      group_color: String,
    }

    }

 export const defaultNoteItem = {
    _id:"",
    thread_name: "",
    thread_topic : "",
    thread_description : "",
    thread_group:"",
    agent_id: 0,
    group_id: "",
    group_info: {
      group_name: "",
      agent_id: 0,
      thread_name:"",
      group_color: "",
    }
  }