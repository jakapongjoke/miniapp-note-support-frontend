export interface NoteGroupInterface {
    _id:String,
    group_name:String,
    agent_id:Number,
    group_color:String,
}
export  interface NoteGroupMainProp{
    _id:String,
    agent_id:Number,
}
export const DefaultNoteGroup = {
    _id:"",
    group_name:"",
    agent_id:"",
    group_color:"",
}