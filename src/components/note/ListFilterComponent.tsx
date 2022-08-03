import { group } from "console"
import  React, { Children,FC } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { groupData,getData } from 'helper';

// import Warroom from '~/sdk'

 
 const DefaultNoteProps = [{
   _id: "",
   thread_name: "test props",
   thread_topic : "",
   thread_description : "",
   thread_group : "",
   agent_id : 0,
   group_id : 0,

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
    }
   }[]

}

const List: React.FC<ListNoteProps> = ({ thread_data }) => {

  const renderList = (): JSX.Element[] => {
      return thread_data.map((item,key) => {
          return (
              <li className="List" key={key} >
                  <div className="List-header">
                      <h2>{item.thread_name}</h2>
                  </div>
                  <p>{item.thread_name}</p>
                  <p className="List-note">{item.thread_name}</p>
              </li>
          )
      })
  }

  return (
      <ul>
          {renderList()} 
      </ul>
  )
}

export default List;