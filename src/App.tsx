import React, { useEffect, useState ,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import { groupData,getData } from './helper';
import FilterComponent from './components/note/FilterComponent';
import ListFilterComponent from './components/note/ListNoteComponent';
import ListNoteComponent from './components/note/ListNoteComponent';
const App = () => {

 type SelectType = [{
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
  group_name: String,
  agent_id: Number,
  thread_name:String,
  group_color: String,
}]
interface ListNoteProps {
  thread_data: {
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


 const curGroup = useRef(0)
 
 useEffect(()=>{
  (async () => {
    const dataGroup = await groupData('/api/note-group/120');
    const dataNoteGroup = await getData('/api/note-item/all/120');
    setListNoteItem(dataNoteGroup)

  setlistGroup(dataGroup);

  console.log("listNoteItem")
  console.log(listNoteItem)
  })()

 },[])
   const onSelectChange = async (e:any) => {
     
    const dataNoteGroup = await getData('/api/note-item/'+e);
    setListNoteItem(dataNoteGroup)
    
    console.log(listGroup)
    console.log(dataNoteGroup)
  };
  return (
    <div className="App">
        <div className="_note">

        <FilterComponent options={listGroup} onChange={onSelectChange} />
        {/* <ListFilterComponent thread_data={listGroup} /> */}
        <ListNoteComponent thread_data={listNoteItem} />

        </div>
    
    </div>
  );

}

export default App;
