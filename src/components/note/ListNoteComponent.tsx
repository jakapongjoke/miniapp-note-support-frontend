import  React,{useState,useEffect} from "react"
import {useDispatch} from 'react-redux'
import { editNote,addNote } from "redux/actions/noteAction";
import { faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stripHtml } from "string-strip-html";
import plus from 'images/plus_icon.png'
import axios from "axios";
import { deleteModalI,defaultDeleteModal } from "interfaces/ModalInterface";
import { makeId,getNote,getData } from "helper";
import {  listNote,deleteNoteItem } from "redux/actions/noteAction";
import { ListNoteItemInterface } from "interfaces/NoteItemInterface";

// import Warroom from '~/sdk'

 
 const DefaultNoteProps = [{
   _id: "",
   thread_name: "",
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


const ListNoteComponent: React.FC<ListNoteItemInterface> = ({thread_data}) => {

  const [deleteModal,setDeleteModal] = useState<deleteModalI>(defaultDeleteModal)

  const [deleteStatus,setDeleteStatus] = useState<String>("")
  const [noteData,setNoteData] = useState<any[]>(DefaultNoteProps)



  const [v,setV] =useState<String>("");

  const dispatch = useDispatch()
  const agent_id = Number(localStorage.getItem("agent_id"))
  


  const removeNote = async (noteId:String,agentId:Number)=>{
    const deleteNote = await axios.delete(`/api/note-item/${noteId}`,{data:{
      agent_id:agentId

  }
     
  });
  if(deleteNote.data.status == "delete_complete"){
    const id = await makeId(7);
    setDeleteModal(defaultDeleteModal)
    setV(id)
    dispatch(deleteNoteItem(agent_id,""))

    }
    
  }


  
  const onDelete = (nodeId:Number,showModal:Boolean)=>{
    setDeleteModal({
        nid:nodeId,
        show:showModal
    });
  

}



const modalDeleteGroup = (_id:String,threadName:String): JSX.Element=>{
  return (
      <div className="modal_delete">
      <div className="modal_content">
          <h2>คุณต้องการลบ {threadName} หรือไม่</h2>
          <span>
          คุณต้องการลบ Note นี้ ใช่หรือไม่
          </span>
          <div className="action">
              <button className="btn cancel" onClick={()=>{
                  setDeleteModal(defaultDeleteModal)
              }}>ยกเลิก</button>
              <button className="btn delete" onClick={()=>{

                removeNote(_id,agent_id)


                  

              }}>ลบ</button>
          </div>
      </div>

  </div>
  )
}

  const renderList = (thread_data:any[]) => {
    console.log(thread_data)
    
      return thread_data.map((item,key) => {
        console.log(item.thread_images[0])
        if(typeof item.thread_images[0]!=="undefined"){
          return (
            
            <div className="note-list" key={key}>
              <div className="note_content">

              <div className="list-header">
                  <div className="remove_note" onClick={()=>{
          onDelete(key,true)
                  }}>
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
                  {stripHtml(item.thread_description.substring(0,30)).result}


                  </span>

                </div>
                <div className="note-short-detail">{stripHtml(item.thread_description.substring(0,50)).result}....</div>
            
                {(() => {
                      if(deleteModal.nid==key && deleteModal.show===true){
                          
                      return (
                          modalDeleteGroup(item._id,item.thread_name)
                      )
                      }
})()}

              </div>
              <div className="note_thumbnail">
                <img src={item.thread_images[0]}></img>
              </div>
        
            </div>




        )

        }else{

          return (
          <div className="note-list" key={key}>
          <div className="list-header">
            <div className="remove_note" onClick={()=>{
    onDelete(key,true)
            }}>
            <FontAwesomeIcon icon={faTimes}/>
            </div>
              <h2 onClick={()=>{
                dispatch(editNote(item._id,item.thread_description))
              }}>
                
                {stripHtml(item.thread_description.substring(0,30)).result}


              </h2>
          </div>
          <div className="group">
            <span>
            {item.group_info.group_name}


            </span>

          </div>
          <div className="note-short-detail">{stripHtml(item.thread_description.substring(0,50)).result}....</div>
      
          {(() => {
                if(deleteModal.nid==key && deleteModal.show===true){
                    
                return (
                    modalDeleteGroup(item._id,item.thread_name)
                )
                }
})()}
      </div>

          )

          
        }
  
      })



  }

  return (
      <div className="note_list_page_wrp">
          {renderList(thread_data)} 
          <div className="add_note">
            <span onClick={()=>{ dispatch(addNote(agent_id,null)) }}>
            <img src={plus}/>
            </span>

              </div>
      </div>
  )
}

export default ListNoteComponent;