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
import { NoteProps,DefaultNoteProps } from "interfaces/NotePropsInterface";
import {NoteGroupType,DefaultNoteGroup} from "types/NoteGroupType"
import axios from "axios";
import SelectListGroupComponent from "../note/SelectListGroupComponent"
const EditNote: React.FC<NoteProps> = (props: NoteProps)=>{

const blurContent = (e:any) =>{
}

const mouseUpContent = (e:any) =>{
}

const saveNote = ()=>{
 console.log('notesaved')
}

const onChangeSelect = (e:any)=>{
console.log('')
}

  const [listGroup,setlistGroup] = useState<any[]>(DefaultNoteGroup);


  useEffect(()=>{
    (async () => {
      const dataGroup = await groupSelectData('/api/note-group/3111');

    setlistGroup(dataGroup);
  
    })()
  
   },[])
  const [NoteItem,setNoteItem] = useState<NoteItemInterface>(defaultNoteItem)
  const positionTxt = useRef(0)
const dispatch = useDispatch();

const note = useSelector((state:RootStore) => state.note.data)

const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  console.log(e.target.value)
}


  useEffect(()=>{
    (async () => {
      const dataNote = await getData('/api/note-item/getinfo/'+props._id);
      setNoteItem(dataNote)

    })()
  
   },[])


    return (
    <>
      <div className="note_view_content">

        <div className="header_area">

          <div className="back"  onClick={()=>{ dispatch(listNote(120,"62c86e1f25f272bd9b9346d8")) }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className="save">
            <button type="button" onClick={saveNote}>SAVE</button>
          </div>

        </div>
   
<div className="view_content_area">

  <div className="note_title" contentEditable="true"  >
  {NoteItem.thread_name}
  </div>
  <div className="group">
        <SelectListGroupComponent options={listGroup} onChange={changeGroup} />
        </div>

<NoteEditor content={note.description} /> 

</div>

      </div>
    </>
    )



    
}


export default EditNote;