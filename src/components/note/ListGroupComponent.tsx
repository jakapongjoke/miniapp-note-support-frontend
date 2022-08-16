import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {NoteGroupType} from 'types/NoteGroupType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAgentId } from "helper";
import { faBarsStaggered,faTrash,faCog } from "@fortawesome/free-solid-svg-icons";
import { EditNoteGroup } from "redux/actions/noteGroupAction";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import parse from 'html-react-parser';
import {backAction} from  "redux/actions/noteGroupAction"
import {listNote} from  "redux/actions/noteAction"
import { RootStore } from 'redux/store';

interface deleteModalI {
    nid:Number|null,
    show:Boolean
}
const defaultDeleteModal = {
    nid:0,
    show:false,
}
interface modalInterface {
    id:String,
    group_name:String
}
const defaultModalData = {
    _id:"",
    group_name:"Example group"
}





const ListGroupLi: React.FC<NoteGroupType> = ({data})=>{
    const dispatch = useDispatch()
    const [deleteModal,setDeleteModal] = useState<deleteModalI>(defaultDeleteModal)
    
     
const modalDeleteGroup = (_id:String,groupName:String): JSX.Element=>{
    return (
        <div className="modal_delete">
        <div className="modal_content">
            <h2>คุณต้องการลบ {groupName} หรือไม่</h2>
            <span>
            การลบ Group นี้ จะไม่สามารถกู้คืนได้ และ Note ที่อยู่ใน Group จะหายทั้งหมด
            </span>
            <div className="action">
                <button className="btn cancel" onClick={()=>{
                    setDeleteModal(defaultDeleteModal)
                }}>ยกเลิก</button>
                <button className="btn delete">ลบ</button>
            </div>
        </div>

    </div>
    )
}


    const onDelete = (nodeId:Number,showModal:Boolean)=>{
        setDeleteModal({
            nid:nodeId,
            show:showModal
        });
      
    }
    useEffect(()=>{
        
    },[])

    const renderList = (): JSX.Element[]=>{
     
        return data.map((item,key)=>{
            return (
                <li key={key}>
                    <span className="group_icon"><FontAwesomeIcon icon={faBarsStaggered}/></span>
                    <span className="group_color" style={{backgroundColor:`${item.group_color}`}}></span>
                    <span className="group_name">{item.group_name}</span>
                    
                    <strong className="icon_group"> 
                    <span className="group_icon_preset trash" onClick={()=>{onDelete(key,true)} }><FontAwesomeIcon icon={faTrash}/></span>
             
                    <span className="group_icon_preset group_setting" onClick={()=>{ dispatch( EditNoteGroup(item._id,item.agent_id)) } } ><FontAwesomeIcon icon={faCog}/></span>

                    </strong>
                    {(() => {
                        if(deleteModal.nid==key && deleteModal.show===true){
                            
                        return (
                            modalDeleteGroup(item._id,item.group_name)
                        )
                        }
})()}
                </li>
            )
        })
    }

    return (
        <>
            {renderList()} 

        </>
    )
}
const ListGroup: React.FC<NoteGroupType> = ({data})=>{
    const dispatch = useDispatch()
    const agent_id = Number(localStorage.getItem("agent_id"))


    return (
        <>
            <div className="header_area">

<div className="back">
<FontAwesomeIcon icon={faArrowLeft} onClick={()=>{
 
    dispatch( backAction("","NOTE_GROUP_BACK") )
    dispatch( listNote(agent_id,"") )
}} /> 
<span>
    EDIT GROUP
</span>


</div>
</div>

<ul className="list_group" id="list_group">
            <ListGroupLi data={data}/>
        </ul> 
   
        </>
       
    )
}
export default ListGroup;
