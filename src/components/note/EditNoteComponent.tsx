import  React, { useRef } from "react"
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { getData,groupData,getAgentID } from "helper";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'  
import FilterComponent from '../note/FilterComponent';
import iconAddImage from 'images/add_image_icon.png'
import ContentEditable from 'react-contenteditable'
import {useDispatch} from 'react-redux'
import { listNote } from "redux/actions/noteAction";

const onSelectChange = (e:any) => {
    console.log(e.target.value)
  };


  const DefaultNoteProps = {
    _id: ""
  }
  interface NoteProps {
     _id:String
 }

 interface NoteItemInterface {
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
  },
}

const defaultNoteItem = {
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
interface NoteGroupType {
  
  group_name: String,
  agent_id: Number,
  thread_name:String,
  group_color: String,
}

const DefaultNoteGroup = [{
  group_name: "",
  agent_id: "",
  thread_name:"",
  group_color: "",
}]
const EditNote: React.FC<NoteProps> = (props: NoteProps)=>{



const blurContent = (e:any) =>{
  console.log(e)
}

const mouseUpContent = (e:any) =>{
  console.log("mouseUpContent")
}

  const [listGroup,setlistGroup] = useState<any[]>(DefaultNoteGroup);
  useEffect(()=>{
    (async () => {
      const dataGroup = await groupData('/api/note-group/120');


    setlistGroup(dataGroup);
  
    })()
  
   },[])
  const [NoteItem,setNoteItem] = useState<NoteItemInterface>(defaultNoteItem)
  const descriptionValue = useRef("")
const dispatch = useDispatch();
  useEffect(()=>{
    (async () => {
      const dataNote = await getData('/api/note-item/getinfo/'+props._id);
      setNoteItem(dataNote)
      descriptionValue.current = dataNote.thread_description
      const AgentID = getAgentID()
console.log(AgentID)
  
    })()
  
   },[])


    return (
    <>
      <div className="note_view_content">

        <div className="header_area">

          <div className="back"  onClick={()=>{ dispatch(listNote(120)) }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className="save">
            <button type="button" >SAVE</button>
          </div>

        </div>
   
<div className="view_content_area">

  <div className="note_title" contentEditable="true"  >
  {NoteItem.thread_name}
  </div>
  <div className="group">
        <FilterComponent options={listGroup} onChange={onSelectChange} />

        </div>
  <div className="note_description" contentEditable="true" onBlur={(e)=>{blurContent(e.target.innerText)} }  onMouseUp={mouseUpContent}  suppressContentEditableWarning={true} >
{descriptionValue.current}
    </div>

</div>
<div className="file_area">
<label id="getFileLabel" htmlFor="getFile">
  <img src={iconAddImage} />

</label>
<input type="file" id="getFile" />
</div>
      </div>
    </>
    )



    
}


export default EditNote;