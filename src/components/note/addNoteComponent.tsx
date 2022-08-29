import  React, { useRef } from "react"
import { getData,groupSelectData,uploadFileToS3 } from "helper";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'  
import FilterComponent from '../note/FilterComponent';
import {  listNote } from "redux/actions/noteAction";
import NoteEditor from "components/editor/NoteEditor";
import { RootStore,Store } from 'redux/store';
import {useDispatch,useSelector} from 'react-redux'
import {NoteItemInterface,defaultNoteItem} from 'interfaces/NoteItemInterface'
import { AddNoteProps,DefaultNoteProps } from "interfaces/NotePropsInterface";
import {NoteGroupType,DefaultNoteGroup} from "types/NoteGroupType"
import axios from "axios";
import SelectListGroupComponent from "../note/SelectListGroupComponent"
import { editorKeyUp,editorKeyDown,editorOnChange } from "events/editorEvents";
import ContentEditable from "react-contenteditable";
import { v4 as uuidv4 } from 'uuid';
import iconAddImage from 'images/add_image_icon.png'
import { clearNoteGroup,backAction,manageNoteGroup } from "redux/actions/noteGroupAction";
import { timeStamp } from "console";
var ObjectID = require("bson-objectid");

var moment = require('moment'); // require

const AddNote: React.FC<AddNoteProps> = (props: AddNoteProps)=>{

const blurContent = (e:any) =>{
}

const mouseUpContent = (e:any) =>{
}

const onKeyUpEV = (e:any) =>{
    if (e.key === "Enter") { // key code of the keybord key
console.log("enter")
        e.preventDefault();
return false;
      }
}

const generateId = () => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const oid = timestamp + 'xxxxxxxxxxxxxxxx'
    .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
    .toLowerCase();

  return { "$oid": oid };
}

const onChangeSelect = (e:any)=>{
console.log('')
}





  const [listGroup,setlistGroup] = useState<any[]>(DefaultNoteGroup);
  const [groupId,setGroupId] = useState<string>("");
  const agent_id = Number(localStorage.getItem('agent_id'))


  useEffect(()=>{
    (async () => {
      const dataGroup = await groupSelectData('/api/note-group/'+agent_id);

    setlistGroup(dataGroup);
 
    })()
  
   },[])


  const [NoteItem,setNoteItem] = useState<NoteItemInterface>(defaultNoteItem)
  const [title,setTitle] = useState<string>("")
  const [lastUpdate,setLastUpdate] = useState<String>("")




  const [noteDescription,setnoteDescription] = useState<String>("")
  const mouseClickPosition = useRef(0)
  const mouseClickTxtSelection = useRef<String>("")


    const positionTxt = useRef(0)
    const [status,setStatus] = useState<String>("")
const dispatch = useDispatch();

const note = useSelector((state:RootStore) => state.note.data)

const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  setGroupId(e.target.value)
}

const saveNote = async (agent_id:Number)=>{
    const descriptionElem = document.getElementById('description')
    const img = descriptionElem?.getElementsByTagName("img");
    console.log(img)
 const add =  await axios.post("/api/note-item/",{
    _id:generateId().$oid,
    thread_name:title,
    thread_description:noteDescription,
    group_id:groupId,
    agent_id:agent_id
  })
console.log(add)
if(add.data.status=="save_complete"){
  setStatus("complete")
  
}

 }
 

 const onClickHandler = async (e:any)=>{
        
  mouseClickPosition.current = document.getSelection()?.focusOffset||0
  mouseClickTxtSelection.current = document.getSelection()?.anchorNode?.nodeValue||""


}



   function getTxtByRange (startNum:number= 0,endNum:number=0,str:String){
    let textEnd = "";
    console.log("startNum+ " + startNum)
    console.log("endNum+ " +endNum)
    for(let i=startNum; i <endNum ; i++){
        textEnd += `${str[i]}`

    }
    console.log(textEnd)
    return textEnd;
}


const updateImgToEditor = async (files:any,currentPosition:number,targetSelector:any)=>{
    console.log("updateImgToEditor")
    console.log(currentPosition)
    const filename = await uuidv4();
    const uploadFile = await uploadFileToS3(files,filename);

    let currentText:String = ""
    let textRangeEnd;
    let newText = ""
    let img = ""
    if(typeof uploadFile !== undefined){
        const location =  await uploadFile?.location;
        currentText = noteDescription
    
        let textRange =   currentText.substring(0,currentPosition)
        
        const total = currentText.length-currentPosition
        let i:Number;

   
        
        
        // currentText.substring(total,currentText.length)
        // // textRangeEnd =   currentText.substring(positionInject,currentText.length)

         img = `<div style="width:200px; display:block;"><img style="width:100%" src="${location}"/></div>`
         let toEndNum = currentText.length-currentPosition
         let textEnd =  getTxtByRange(currentPosition,currentText.length,currentText);
        newText = textRange+img+textEnd
        // console.log(newText)
        // console.log(textEnd)

        // dispatch(UpdateImageNoteEditor(newText))
        setnoteDescription(newText)
    }else{

        console.log("undefined")
    }
  
  }

    return (
    <>
      <div className="note_view_content">

        <div className="header_area">

          <div className="back"  onClick={()=>{ dispatch(listNote(agent_id,"")) }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className="save">
            <button type="button" onClick={()=>{saveNote(agent_id)}}>ADD NOTE</button>
          </div>

        </div>
   
<div className="view_content_area">

  <input className="note_title" contentEditable="true"  
  onChange={(e)=>{ setTitle(e.target.value) } }  value={title}
  />


  <div className="group">
        <SelectListGroupComponent options={listGroup} onChange={changeGroup} currentGroup={groupId} />
        {
        (()=>{
          if( status =="complete"){
            return(
              <div className="status complete">
                Add Note Complete 
              </div>
            )
          }
        }
      )()}
        </div>
        {
        (()=>{
          if( status =="complete"){
            return(
              <div className="data_save" >
              Add Complete <span className="back_to_group" onClick={
                  ()=>{ 
                      dispatch(backAction("",""))
                      window.location.reload()
                      
                      }}>Back To Group list</span>
            </div>
            )
          }
        }
      )()}
        <ContentEditable  onKeyUp={onKeyUpEV} className="note_description" id="description" 
        html={noteDescription.toString()} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={ (e)=>{ editorOnChange(e,
          ()=>{
            console.log(e)
            setStatus("editing")

             setnoteDescription(e.target.value)
          }
         ) }} 

        onClick={(e)=>{onClickHandler(e)}}
      />
          <div className="file_area">
<label id="getFileLabel" htmlFor="getFile">
  <img src={iconAddImage} />

</label>
<input type="file" id="getFile" onChange={(e)=>{ 
    
    updateImgToEditor(e.target.files,mouseClickPosition.current,e.target)

}

    }   />
</div>
</div>

      </div>
    </>
    )



    
}


export default AddNote;