import React, { useMemo, useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { groupData, getData, getAgentId } from './helper';
import FilterComponent from './components/note/FilterComponent';
import ListFilterComponent from './components/note/ListNoteComponent';
import ListNoteComponent from './components/note/ListNoteComponent';
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, Store } from './redux/store';
import EditNote from 'components/note/EditNoteComponent';
import SelectList from 'components/editor/ListSelectComponent';
import { bindActionCreators } from 'redux'
import { listNote } from 'redux/actions/noteAction';
import ListGroup from 'components/note/ListGroupComponent';
import { checkAgentId } from './helper';
import Warroom from "sdk"
import { AgentInterface } from 'interfaces/AgentInterface';
import EditNoteGroup from 'components/note/EditGroupNoteComponent';
import AddNoteGroup from 'components/note/AddNoteGroupComponent';
import AddNote from 'components/note/addNoteComponent';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const dispatch = useDispatch()


  let note = useSelector((state: RootStore) => state.note.data)

  let notestate = useSelector((state: RootStore) => state)

  let user = useSelector((state: RootStore) => state.user.data)

  type SelectType = [{
    label: String,
    value: String
  }]

  type NotegroupType = [{
    group_name: String,
    agent_id: Number,
    thread_name: String,
    group_color: String,
  }]

  interface ListNoteProps {
    thread_data: {
      _id: String,
      thread_name: String,
      thread_topic: String,
      thread_description: String,
      thread_group: String,
      agent_id: Number,
      group_id: Object,
      group_info: {
        group_name: String,
        agent_id: Number,
        thread_name: String,
        group_color: String,
      },

    }[]


  }


  const [listNoteItem, setListNoteItem] = useState<ListNoteProps["thread_data"]>([]);
  const curGroup = useRef<String>("")

  const noteStatus = useRef<String>("listing")
  const [page, setPage] = useState('home')

  const list = bindActionCreators(listNote, dispatch)
  const ValNotegroupType = [{
    group_name: "",
    agent_id: "",
    thread_name: "",
    group_color: "",
  }]
  const [listGroup, setlistGroup] = useState<any[]>(ValNotegroupType);

  const agent_id = Number(localStorage.getItem("agent_id"));

  useEffect(() => {


    (async () => {

      if (process.env.REACT_APP_ENV == "prod") {
        const warroom = new Warroom();
        const applicationStatus = await warroom.init({
          appType: "taskpane",
          appId: "117454667",
        });

        const AgentInformation = await warroom.getCurrentAgent();
        localStorage.setItem("agent_id", AgentInformation.agent_id)

      } else {
        const AgentInformation = await getAgentId()

        localStorage.setItem("agent_id", AgentInformation.agent_id)

      }


      if (!notestate.note.data.group_id) {

        const dataNoteItem = await getData('/api/note-item/all/' + agent_id);

        setListNoteItem(dataNoteItem)

      } else {

        const dataNoteItem = await getData('/api/note-item/' + notestate.note.data.group_id + '/' + agent_id);

        setListNoteItem(dataNoteItem)

      }



      const dataGroup = await groupData('/api/note-group/' + agent_id);
      setlistGroup(dataGroup);

    })()

    noteStatus.current = note.status;





  }, [note, notestate.note.data.group_id, notestate.noteGroup.data.status]);

  switch (notestate.noteGroup.data.status) {
    case 'note_group_edit_data': {
      note.status = notestate.noteGroup.data.status

      break;
    }
    case 'back_to_group': {

      note.status = 'note_group_manage';



      break;


    }

    case 'back_to_list': {

      note.status = 'listing'
      history.go(0);

      break;
    }
    case 'note_group_add_data': {
      note.status = 'note_group_add_data'

      break;
    }


    default: {
      note.status = note.status
      break;
    }
  };

  switch (note.status) {
    case 'listing':

      return (
        <div className="App">

          <div className="_note" style={{ marginTop: 20 }}>
            <SelectList data={listGroup} randString={uuidv4()} currentGroup={note.group_id} />

            <ListNoteComponent thread_data={listNoteItem} />
          </div>

        </div>
      );

    case 'filter':
      return (
        <div className="App">
          <div className="_note">

            <SelectList data={listGroup} randString={uuidv4()} currentGroup={note.group_id} />

            <ListFilterComponent thread_data={listNoteItem} />
          </div>

        </div>
      );

    case 'edit':
      return (
        <div className="App">
          <EditNote _id={note._id} />
        </div>
      );
    case 'delete_note':

      return (
        <div className="App">
          <div className="_note">
            <SelectList data={listGroup} randString={uuidv4()} currentGroup={note.group_id} />

            <ListNoteComponent thread_data={listNoteItem} />
          </div>

        </div>
      );

    case 'update_image_in_editor':
      return (
        <div className="App">
          <EditNote _id={note._id} />
        </div>
      );

    case 'note_group_manage':
      return (
        <div className="App">

          <ListGroup data={listGroup} currentGroup={note.group_id} randString={uuidv4()} />
        </div>
      );

    case 'note_group_edit_data':
      return (
        <div className="App">
          <EditNoteGroup _id={notestate.noteGroup.data._id} agent_id={notestate.noteGroup.data.agent_id} />
        </div>
      );
    case 'add_note':
      return (
        <div className="App">
          <AddNote agent_id={agent_id} />

        </div>
      );

    case 'note_group_add_data':

      return (
        <div className="App">
          <AddNoteGroup agent_id={agent_id} />
        </div>
      );

    default:
      return (
        <div className="App">
          <div className="_note">

            <SelectList data={listGroup} currentGroup={note.group_id} randString={uuidv4()} />
            {/* <ListFilterComponent thread_data={listGroup} /> */}
            <ListNoteComponent thread_data={listNoteItem}    {...list} />

          </div>

        </div>
      );
  }


}

export default App;
