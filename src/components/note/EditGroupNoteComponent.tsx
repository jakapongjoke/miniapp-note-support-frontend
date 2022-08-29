import { getData } from "helper";
import { NoteGroupMainProp } from "interfaces/NoteGroupInterface";
import React
, { useEffect,useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { backAction,manageNoteGroup } from "redux/actions/noteGroupAction";
import { useDispatch } from "react-redux";
import axios from 'axios'

const EditNoteGroup: React.FC<NoteGroupMainProp> = (props:NoteGroupMainProp)=>{

    const dispatch = useDispatch()
    const [groupName,setGroupName] = useState<string>("Example group")
    const [groupColor,setGroupColor] = useState<string>("")

    useEffect(()=>{
        (async()=>{
            const dataNoteGroup = await getData(`/api/note-group/${props.agent_id}/${props._id}`)
            console.log(dataNoteGroup)
            setGroupName(dataNoteGroup.group_name)
            setGroupColor(dataNoteGroup.group_color)

        })()
    },[])
    const groupName_ref = useRef<any>()

    const colorList = ["#F9E799","#F38332","#CDE499","#99D1D4","#BFA7D8","#F59FAE","#C7324C","#C5C7C9","#A1968A"]
    const [color,setColor] = useState<string[]>(colorList)

   
useEffect(()=>{
    groupName_ref.current = groupName

},[groupName,groupName_ref])

const groupNameChange = (e:any)=>{
    setGroupName(e.target.value)
    groupName_ref.current = groupName

}

const colorLi = (currentGroupColor:String):JSX.Element[]=>{
    return color.map((item,k) =>{
        let colorFocus ;

    if(currentGroupColor==item){
        colorFocus = true;
    }else{
        colorFocus = false;
    }
    return currentGroupColor===item?
            (  <li key={k} className="palette focus"

                    style={{backgroundColor:`${item}`}} onClick={()=>{
                        setGroupColor(item)
                    }}></li>
            )
    :
            (
                <li key={k} className="palette"

                style={{backgroundColor:`${item}`}} onClick={()=>{
                    setGroupColor(item)
                }}></li>
            )
    })
}
const [status,setStatus] = useState<String>("")


const updateNote = async (_id:string,agentId:Number)=>{

    const edit =  await axios.put("/api/note-group/"+props._id,{
        group_name:groupName,
        agent_id:agentId,
        group_color:groupColor,

      })
      console.log(edit)
      if(edit.data.status=="update_complete"){
        console.log(edit.data)
        setStatus("complete")
      }
      

}
return (
  <div className="view_note_group">
    <div className="header_area">

    <div className="back"  onClick={()=>{ dispatch(backAction("back_to_group","NOTE_GROUP_BACK")) }}>
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
            <span className="groupName">{groupName}</span>

            </div>
          

            <div className="group_label" >
            <span style={{backgroundColor:`${groupColor}`}}>
            {groupName}
            </span>
            </div>
        </div>
        {
        (()=>{
          if( status =="complete"){
            return(
              <div className="data_save" >
                Update Complete <span className="back_to_group" onClick={()=>{ dispatch(manageNoteGroup(props.agent_id)) }}>Back To Group list</span>
              </div>
            )
          }
        }
      )()}
    </div>
 
    <div className="edit_area">
        <div className="name_input">
        <input name="groupName" type="text" onChange={groupNameChange} value={groupName} />
        </div>


        <div className="list_color">
        <span>Group Color : </span>
        <ul className="color">
        {colorLi(groupColor)}
        </ul>
        </div>
        <div className="action_area">
        <div className="button_group">
            <button className="cancel">Cancel</button>
            <button  className="save" onClick={(e)=>{
                updateNote(props._id.toString(),props.agent_id)
            }}>Save</button>
        </div>
        </div>
    </div>

  </div>
)

}
export default EditNoteGroup;