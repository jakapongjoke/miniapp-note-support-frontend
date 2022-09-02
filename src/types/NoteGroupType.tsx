export type NoteGroupDataType = {
    _id: String,
    group_name: String,
    agent_id: Number,
    thread_name:String,
    group_color: String,
  }

  export type NoteGroupType = {
    data:NoteGroupDataType[],
    randString:String|undefined|null
    currentGroup:String|undefined|null
  }


  export const DefaultNoteGroup = [{
    group_name: "",
    agent_id: "",
    thread_name:"",
    group_color: "",
  }]
  