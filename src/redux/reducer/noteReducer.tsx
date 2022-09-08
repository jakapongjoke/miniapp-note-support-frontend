interface pageState {
    data:{
        _id:String,
        status:String,
        group_id:String,
        description:String

    }
}
type pageStateType = pageState;

const initialState = 
         {
            data:{
              _id:"",
            status:"listing",
            group_id:"",
            description:"",
         }
        }

type Action = {type:String,payload:{
    _id:String,
    status:String,
    group_id:String
    description:String
   }}


const NOTE_EDIT:String = 'NOTE_EDIT'
const NOTE_LIST:String = 'NOTE_LIST'
const NOTE_FILTER:String = 'NOTE_FILTER'
const NOTE_DELETE:String = 'NOTE_DELETE'

const NOTE_UPDATE_IMAGE_EDITOR:String = 'NOTE_UPDATE_IMAGE_EDITOR'
const NOTE_GROUP_MANAGE:String = 'NOTE_GROUP_MANAGE'
const NOTE_ADD:String = 'NOTE_ADD'

 const noteReducer = (state:pageStateType = initialState ,action:Action)=>{
    
    switch (action.type){
        case NOTE_EDIT: {
            
            return  {...state,data:action.payload}
        }
        
        case NOTE_LIST:{
          return  {...state,data:action.payload}
          
        }
        case NOTE_DELETE:{
          return  {...state,data:action.payload}
          
        }
        case NOTE_FILTER:{
          return  {...state,data:action.payload}
          
        }
        case NOTE_UPDATE_IMAGE_EDITOR:{
          return  {...state,data:action.payload}
          
        }
        case NOTE_GROUP_MANAGE:{
          return  {...state,data:action.payload}
          
        }
        case NOTE_ADD:{
          return  {...state,data:action.payload}
          
        }
        default:
          return state;
          
      }
}
export default noteReducer