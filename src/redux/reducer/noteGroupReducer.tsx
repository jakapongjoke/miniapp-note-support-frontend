interface noteGroupState {
    data:{
        _id:String,
        agent_id:Number,
        status:String,
    }
}

const initialState = 
         {
          data:{
            _id:"",
            agent_id:0,
            status:"",
          }
  
         
        }

type Action = {type:String,payload:{
    _id:String,
    agent_id:Number,
    status:String,

   }
}


const NOTE_GROUP_BACK:String = 'NOTE_GROUP_BACK'
const NOTE_GROUP_EDIT_DATA:String = 'NOTE_GROUP_EDIT_DATA'
 const noteGroupReducer = (state:noteGroupState = initialState ,action:Action)=>{
    switch (action.type){
        case NOTE_GROUP_EDIT_DATA: {
            
            return  {
                ...state,
                data:action.payload
            }
        }

        case NOTE_GROUP_BACK: {
            
            return  {
                ...state,
                data:action.payload
            }
        }

        default:
          return state;
          
      }
}
export default noteGroupReducer