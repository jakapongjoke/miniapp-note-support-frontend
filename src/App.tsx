import React, { useMemo, useEffect, useState ,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import { groupData,getData, getAgentId } from './helper';
import FilterComponent from './components/note/FilterComponent';
import ListFilterComponent from './components/note/ListNoteComponent';
import ListNoteComponent from './components/note/ListNoteComponent';
import {useSelector, useDispatch} from 'react-redux'
import { RootStore,Store } from './redux/store';
import EditNote from 'components/note/EditNoteComponent';
import SelectList from 'components/editor/ListSelectComponent';
import { bindActionCreators } from 'redux'
import { listNote } from 'redux/actions/noteAction';
import ListGroup from 'components/note/ListGroupComponent';
import { checkAgentId } from './helper';
import Warroom from "sdk"
import { AgentInterface } from 'interfaces/AgentInterface';

const App = () => {

  const dispatch = useDispatch()
 
  
   let note = useSelector((state:RootStore) => state.note.data)

   let notestate = useSelector((state:RootStore) => state)

   let user = useSelector((state:RootStore) => state.user.data)

 type SelectType =   [{
    label:String,
    value:String
 }]
 
 type NotegroupType = [{
  group_name: String,
  agent_id: Number,
  thread_name:String,
  group_color: String,
}]
 const ValNotegroupType = [{
  group_name: "",
  agent_id: "",
  thread_name:"",
  group_color: "",
}]
interface ListNoteProps {
  thread_data: {
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

  }[]


}
 const [listGroup,setlistGroup] = useState<any[]>(ValNotegroupType);

 
 const [listNoteItem,setListNoteItem] = useState<ListNoteProps["thread_data"]>([]);
 const curGroup = useRef<String>("") 


 const noteStatus = useRef<String>("listing")
 const [page,setPage] = useState('home')

 const list = bindActionCreators(listNote,dispatch)


 useEffect(()=>{

  
  (async () => {
    
  console.log(process.env.REACT_APP_ENV)
    if(process.env.REACT_APP_ENV=="prod"){
      const warroom = new Warroom();
      const applicationStatus = await warroom.init({
        appType: "taskpane",
        appId: "117454667",
      });
  
      const ClientInformation = await warroom.getClientInformation();
      console.log("Hey"+ ClientInformation.agent_id)
      localStorage.setItem("agent_id",ClientInformation.agent_id)
      
    }else{
      const ClientInformation = await getAgentId()
      console.log("Hey Dev ENV")

      localStorage.setItem("agent_id",ClientInformation.agent_id)
      
    }
  

    const dataGroup = await groupData('/api/note-group/120');

    if(!notestate.note.data.group_id){
      const dataNoteGroup = await getData('/api/note-item/all/120');

      setListNoteItem(dataNoteGroup)
    }else{
 
      const dataNoteGroup = await getData('/api/note-item/'+notestate.note.data.group_id);
      console.log(dataNoteGroup)

      setListNoteItem(dataNoteGroup)

     

    }


  setlistGroup(dataGroup);
  })()
  noteStatus.current = note.status;
 },[note.group_id])


  switch (note.status) {
    case 'listing':
      return (
        <div className="App">
            <div className="_note">
           
            {/* <FilterComponent options={listGroup} onChange={onSelectChange} /> */}
            {/* <ListFilterComponent thread_data={listGroup} /> */}
            <SelectList data={listGroup} />

            <ListNoteComponent thread_data={listNoteItem} />
            </div>
        
        </div>
      );

      case 'edit':
        return (
          <div className="App">
           <EditNote _id={note._id}/>
          </div>
        );

      case 'update_image_in_editor':
        return (
          <div className="App">
           <EditNote _id={note._id}/>
          </div>
        );

      case 'note_group_manage':
        return (
          <div className="App">
            <ListGroup data={listGroup}/>
          </div>
        );


      default:
        return (
          <div className="App">
            <div className="_note">
          
              <SelectList data={listGroup}  />
              {/* <ListFilterComponent thread_data={listGroup} /> */}
              <ListNoteComponent thread_data={listNoteItem}  {...list} />
      
              </div>
          
          </div>
        );
  }



}

export default App;
