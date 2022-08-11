import React,{useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import {NoteGroupType} from 'types/NoteGroupType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAgentId } from "helper";
import { faBarsStaggered,faTrash,faCog } from "@fortawesome/free-solid-svg-icons";
import { EditNoteGroup } from "redux/actions/noteGroupAction";


const ListGroupLi: React.FC<NoteGroupType> = ({data})=>{
    const dispatch = useDispatch()
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
                    <span className="group_icon_preset trash"><FontAwesomeIcon icon={faTrash}/></span>
                    <span className="group_icon_preset group_setting" onClick={()=>{ dispatch( EditNoteGroup(item._id,item.agent_id)) } } ><FontAwesomeIcon icon={faCog}/></span>

                    </strong>
      

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
    return (
        <ul className="list_group">
            <ListGroupLi data={data}/>
        </ul>
    )
}
export default ListGroup;
