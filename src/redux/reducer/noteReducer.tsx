interface pageState {
    data:{
        id:String,
        status:String,

    }
}
type pageStateType = pageState;

const initialState = 
         {
            data:{
            id:"62cdb11281f41f594ba5f66s",
            status:"listing",
         }
        }

type Action = {type:"NOTE_EDIT",payload:{
    id:String,
    status:String
   }}

 const noteReducer = (state:pageStateType = initialState ,action:Action)=>{
    
    switch (action.type) {
        case 'NOTE_EDIT': {
            
            return  {...state,data:action.payload}

        }
        default:
          return state;
      }
}
export default noteReducer