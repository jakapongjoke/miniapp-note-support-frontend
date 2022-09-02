import  React from "react"
import {useDispatch} from 'react-redux'
import { editNote,addNote } from "redux/actions/noteAction";
import { faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stripHtml } from "string-strip-html";

// import Warroom from '~/sdk'

 
 const DefaultNoteProps = [{
   _id: "",
   thread_name: "test props",
   thread_topic : "",
   thread_description : "",
   thread_group : "",
   agent_id : 0,
   group_id : 0,
   group_info: {
    group_name: "",
    agent_id: "",
    thread_name:"",
    group_color: "",
  }

 }]
 interface ListNoteProps {
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


// const ListNoteComponent = ({}):React.Fc<ListNoteProps> = ({thread_data})=>{
//   return (
//     <div>
//       {thread_data.map(thread=>{
//         return (
//           <div>
//             {thread.thread_name}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

const List: React.FC<ListNoteProps> = ({ thread_data }) => {
  const dispatch = useDispatch()
  const agent_id = Number(localStorage.getItem("agent_id"))
  
  const removeNote = (e:any)=>{
    
  }
  const renderList = (): JSX.Element[] => {
      return thread_data.map((item,key) => {
        // console.log(item)
          return (
              <div className="note-list" key={key}>
                  <div className="list-header">
                    <div className="remove_note" onClick={removeNote}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </div>
                      <h2 onClick={()=>{
                        dispatch(editNote(item._id,item.thread_description))
                      }}>
                        
                        {item.thread_name}


                      </h2>
                  </div>
                  <div className="group">
                    <span>
                    {item.group_info.group_name}


                    </span>

                  </div>
                  <div className="note-short-detail">{stripHtml(item.thread_description.substring(0,50)).result}....</div>
              
       
              </div>
          )
      })
  }

  return (
      <div className="note_list_page_wrp">
          {renderList()} 
          <div className="add_note">
            <span onClick={()=>{ dispatch(addNote(agent_id,null)) }}>
                                    <FontAwesomeIcon icon={faPlus} />

            </span>

              </div>
      </div>
  )
}

export default List;