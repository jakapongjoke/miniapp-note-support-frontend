import { getData } from "helper";
import { NoteGroupMainProp } from "interfaces/NoteGroupInterface";
import React
, { useEffect,useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { backToNoteGroup } from "redux/actions/noteGroupAction";
import { useDispatch } from "react-redux";
const EditNoteGroup: React.FC<NoteGroupMainProp> = (props:NoteGroupMainProp)=>{
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     (async()=>{
    //         // const dataNoteGroup = await getData(`/api/note-group/${props.agent_id}/${props._id}`)

    //     })
    // },[])
    const [group_name,setGroupName] = useState<string>("Example group")
    const group_name_ref = useRef<any>()

    const colorList = ["#F9E799","#F38332","#CDE499","#99D1D4","#BFA7D8","#F59FAE","#C7324C","#C5C7C9","#A1968A"]
    const [color,setColor] = useState<string[]>(colorList)

    const [groupColor,setGroupColor] = useState<string>("#F38332")
   
useEffect(()=>{
    group_name_ref.current = group_name

},[group_name,group_name_ref])

const groupNameChange = (e:any)=>{
    setGroupName(e.target.value)
    group_name_ref.current = group_name

}

const colorLi = ():JSX.Element[]=>{
    return color.map((item) =>{
        return (
            <li className="palette" style={{backgroundColor:`${item}`}} onClick={()=>{
                setGroupColor(item)
            }}></li>
        )
    })
}

return (
  <div className="view_note_group">
    <div className="header_area">

    <div className="back"  onClick={()=>{ dispatch(backToNoteGroup()) }}>
    <FontAwesomeIcon icon={faArrowLeft} /> 
    <span>
        EDIT GROUP
    </span>

  
    </div>
    </div>

    <div className="view_area">
        <span className="preview">Preview</span>
        <div className="group_data">
            <div className="info">

                  <span className="group_color" style={{backgroundColor:`${groupColor}`}}></span>
            <span className="group_name">{group_name}</span>

            </div>
          

            <div className="group_label" >
            <span style={{backgroundColor:`${groupColor}`}}>
            {group_name}
            </span>
            </div>
        </div>
    </div>
    <div className="edit_area">
        <div className="name_input">
        <input name="group_name" type="text" onChange={groupNameChange} value={group_name} />
        </div>


        <div className="list_color">
        <span>Group Color : </span>
        <ul className="color">
        {colorLi()}
        </ul>
        </div>
        <div className="action_area">
        <div className="button_group">
            <button className="cancel">Cancel</button>
            <button  className="save">Save</button>
        </div>
        </div>
    </div>

  </div>
)

}
export default EditNoteGroup;