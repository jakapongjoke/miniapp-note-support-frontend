import {NoteGroupType,DefaultNoteGroup} from "types/NoteGroupType"
import { useRef,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { filterNote,listNote,manageNoteGroup } from "redux/actions/noteAction";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { stripHtml } from "string-strip-html";

const Select: React.FC<NoteGroupType> = ({ data,currentGroup }: NoteGroupType) => {

  const [showList,setShowList] = useState<Boolean>(false)
  const dispatch = useDispatch()
  const agent_id = Number(localStorage.getItem('agent_id'))

  const renderList = (showList:Boolean): JSX.Element[] => {
    return data.map((item,key) => {
if(item._id==currentGroup){
      return (
        
          <li className="selected" key={key} onClick={ ()=> { 
            dispatch( listNote(agent_id,item._id) ) 
            setShowList(false)
          } }>
                  <span className="group_color" style={{backgroundColor:`${item.group_color}`}}></span>
                  <span>{item.group_name}</span>
         
          </li>

      )
  
  }else{

    return (
        
      <li className="list" key={key} onClick={ ()=> { 
        dispatch( listNote(agent_id,item._id) ) 
        setShowList(false)
      } }>
              <span className="group_color" style={{backgroundColor:`${item.group_color}`}}></span>
              <span className="text">{item.group_name}</span>
     
      </li>





  )


  }

      
  })
    
  }
if(showList===true){
  console.log("showList"+currentGroup)
  return (
      <ul className="group_list">
        
        <span className="setting" onClick={()=>{setShowList(!showList)}}><FontAwesomeIcon icon={faCaretDown}/></span>
        {
        (()=>{
          if(currentGroup==""){
          return (
            <li className="selected" ><span></span>All Group</li>
          )
          }else{
            <li className="list" onClick={ ()=> { 
              dispatch( listNote(agent_id,"") ) 
              setShowList(false)
            } }><span></span>All Group</li>

          }
          }
        )()}
            <ul className="group_list_data">

          {
             
                        renderList(showList)

            

          }
            
          <li className="setting_list" onClick={()=>{ 
            dispatch(manageNoteGroup(agent_id)) 
          setShowList(!showList)
          } }><span><FontAwesomeIcon icon={faCog}/></span> Manage Group</li>
          </ul>



      </ul>
  )
        }else{
          return (
            <ul className="group_list">
                  <span className="setting"  onClick={()=>{setShowList(!showList)}}><FontAwesomeIcon icon={faCaretDown}/></span>
                  <li className="selected" >All Group</li>
            </ul>
        )

        }


}
const SelectList: React.FC<NoteGroupType> = (props: NoteGroupType)=>{
  console.log(props.data)
  return (
  <>
    <Select data={props.data} currentGroup={props.currentGroup} randString={uuidv4()}/>

  </>
  )
}

export default SelectList

