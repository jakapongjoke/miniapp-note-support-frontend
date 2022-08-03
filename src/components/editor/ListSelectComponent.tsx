import {NoteGroupType,DefaultNoteGroup} from "types/NoteGroupType"
import { useRef,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { filterNote,listNote,manageNoteGroup } from "redux/actions/noteAction";
import { connect } from "react-redux";
const Select: React.FC<NoteGroupType> = ({ data }: NoteGroupType) => {

  const [showList,setShowList] = useState<Boolean>(false)
  const dispatch = useDispatch()
  const renderList = (showList:Boolean): JSX.Element[] => {

    return data.map((item,key) => {
      return (
          <li className="list" key={key} onClick={ ()=> { 
            dispatch( listNote(120,item._id) ) 
            setShowList(false)
          } }>
                  <span className="group_color" style={{backgroundColor:`${item.group_color}`}}></span>
                  <span>{item.group_name}</span>
         
          </li>
      )
  })
    
  }
if(showList===true){
  return (
      <ul className="group_list">
        
        <span className="setting" onClick={()=>{setShowList(!showList)}}><FontAwesomeIcon icon={faCaretDown}/></span>

            <li className="selected" ><span></span>All Group</li>
            <ul className="group_list_data">

          {
             
                        renderList(showList)

            

          }
            
          <li className="setting_list" onClick={()=>{ dispatch(manageNoteGroup(120)) 
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
  return (
  <>
    <Select data={props.data} />

  </>
  )
}

export default SelectList

