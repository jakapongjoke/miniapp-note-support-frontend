import  React, { useRef } from "react"
import { getData,groupSelectData,uploadFileToS3 } from "helper";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faClose } from '@fortawesome/free-solid-svg-icons'  
import FilterComponent from '../note/FilterComponent';
import {  listNote } from "redux/actions/noteAction";
import NoteEditor from "components/editor/NoteEditor";
import { RootStore,Store } from 'redux/store';
import {useDispatch,useSelector} from 'react-redux'
import {NoteItemInterface,defaultNoteItem} from 'interfaces/NoteItemInterface'
import { NoteProps,DefaultNoteProps } from "interfaces/NotePropsInterface";
import {NoteGroupType,DefaultNoteGroup} from "types/NoteGroupType"
import axios from "axios";
import SelectListGroupComponent from "../note/SelectListGroupComponent"
import { editorKeyUp,editorKeyDown,editorOnChange } from "events/editorEvents";
import ContentEditable from "react-contenteditable";
import { v4 as uuidv4 } from 'uuid';
import iconAddImage from 'images/add_image_icon.png'
import e from "express";
var moment = require('moment'); // require

const EditNote: React.FC<NoteProps> = (props: NoteProps)=>{

const blurContent = (e:any) =>{
}

const mouseUpContent = (e:any) =>{
}

const onKeyUpEV = (e:any) =>{
  console.log("k up")
  // setnoteDescription(e.target.value)
}



const onChangeSelect = (e:any)=>{
console.log('')
}





  const [listGroup,setlistGroup] = useState<any[]>(DefaultNoteGroup);
  const [groupId,setGroupId] = useState<String>("");

  const agent_id =  Number(localStorage.getItem('agent_id'))

  useEffect(()=>{
    (async () => {
      const dataGroup = await groupSelectData('/api/note-group/'+agent_id);

    setlistGroup(dataGroup);
 
    })()
  
   },[])


  const [NoteItem,setNoteItem] = useState<NoteItemInterface>(defaultNoteItem)
  const [title,setTitle] = useState<string>("")
  const [threadImages,setThreadImages] = useState<[]>([])

  const [lastUpdate,setLastUpdate] = useState<String>("")

  const [images,setImages] = useState<any[]>([]);



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

const saveNote = async (id:String)=>{
 const edit =  await axios.put("/api/note-item/"+props._id,{
    title:title,
    description:noteDescription,
    thread_images:images,
    group_id:groupId
  })
if(edit.data.status=="complete"){
  setStatus("complete")
  setLastUpdate(edit.data.updated_date)
}

 }
 

 const onClickHandler = async (e:any)=>{
        
  mouseClickPosition.current = document.getSelection()?.focusOffset||0
  mouseClickTxtSelection.current = document.getSelection()?.anchorNode?.nodeValue||""

console.log(document.getSelection())
console.log(mouseClickPosition.current)
console.log( mouseClickTxtSelection.current)
console.log(e)
console.log(e.target)

}


  useEffect(()=>{
    (async () => {
      const dataNote = await getData('/api/note-item/getinfo/'+props._id);
      setNoteItem(dataNote)
  
      const title = await dataNote.thread_name
      const description = await dataNote.thread_description
      const group_id = await dataNote.group_id
      const thread_images = await dataNote.thread_images
   
      setTitle(title)
      setnoteDescription(description)
      setGroupId(group_id)
      if(thread_images[0]!==""){
        setImages(thread_images)

      }

    })()
  
   },[])


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

const updateThumbnail = async (files:any)=>{

  if(files.length>0){
    const filename = await uuidv4();
    const uploadFile = await uploadFileToS3(files,filename);
    if(typeof uploadFile !== undefined){
      const location =  await uploadFile?.location;
      console.log(images.length)
      if(images.length===0){
        setImages(images=>[location])
  
      }else{
        setImages(images=>[...images,location])
  
      }
  
    }
  
  }
  
  }


  const deleteThumbnail = (idx:Number)=>{
    let data = images;
    const item = images.filter(function(item,id){
      return id!==idx
    })
    setImages(item)
  }
  
  const imageList = (images:any[])=> {
  
    return images.map((item,key) => {
      if(item){
        return (
          <div className="thumbnail" key={key}>
           <span className="delete_thumb" onClick={()=>{ deleteThumbnail(key) }}>
           <FontAwesomeIcon icon={faClose} />
    
           </span>
            <a href={item} target="blank">
            <img src={item} key={key}/>
    
    
            </a>
          </div>
        )    
      }
     
  
  
      })
   
  
  
    
  
  }

    return (
    <>
      <div className="note_view_content">

        <div className="header_area">

          <div className="back"  onClick={()=>{ dispatch(listNote(agent_id,"")) }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className="save">
            <button type="button" onClick={()=>{saveNote(props._id)}}>SAVE</button>
          </div>

        </div>
   
<div className="view_content_area">

  <input className="note_title" contentEditable="true"  
  onChange={(e)=>{ setTitle(e.target.value) } }  value={title}
  />


  <div className="group">
        <SelectListGroupComponent options={listGroup} onChange={changeGroup} currentGroup={groupId.toString()} />
 
        </div>
        {
        (()=>{
          if( status =="complete"){
            return(
              <div className="date_update">
                Last Updated : 
                {
               lastUpdate
                }
              </div>
            )
          }
        }
      )()}
        <ContentEditable className="note_description" id="description" 
        html={noteDescription.toString()} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={ (e)=>{ editorOnChange(e,
          ()=>{
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
    
    updateThumbnail(e.target.files)

}

    }   />
</div>
</div>

      </div>


      <div className="images">
      <h4>Images</h4>

{

  imageList(images)






}
</div>



    </>
    )



    
}


export default EditNote;