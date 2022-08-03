export const manageNoteGroup = (agentId:Number)=>{
    return {
        type: 'NOTE_GROUP_MANAGE',
        payload:{
             agent_id:agentId,
         status:"note_group_manage"
        }
    }
}