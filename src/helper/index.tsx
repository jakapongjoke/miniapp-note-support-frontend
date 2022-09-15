import axios from 'axios';
import Warroom from 'sdk';
import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from '_config/uploadFile';
import { AnyMxRecord } from 'dns';
import { promises } from 'stream';
import { AgentInterface } from 'interfaces/AgentInterface';
const short = require('short-uuid');
const translator = short().uuid(); // Defaults to flickrBase58

window.Buffer = window.Buffer || require("buffer").Buffer;


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function getData(url: string) {

    return await axios.get(url).then((resp:any) => {
      return resp.data;
    });
  }
export async function getNote(group_id:String,agent_id:number){
  
    return await axios.get(`/api/note-item/${agent_id}`).then((resp:any) => {
      return resp.data;
    });
}
export const generateId = () => {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const oid = timestamp + 'xxxxxxxxxxxxxxxx'
    .replace(/[x]/g, _ => (Math.random() * 16 | 0).toString(16))
    .toLowerCase();

  return { "$oid": oid };
}



  export async function groupData(url: string) {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      let groupData = new Array();
      await axios.get(url).then((resp:any) => {
        resp.data.map((data:any,k:number)=> groupData[k] = { _id: data._id , agent_id: data.agent_id , group_name: data.group_name,group_color:data.group_color} )
        
      });
      return groupData;
    }


    export async function groupSelectData(url: string) {
      axios.defaults.baseURL = process.env.REACT_APP_API_URL;
        let groupData = new Array();
        await axios.get(url).then((resp:any) => {
          resp.data.map((data:any,k:number)=> groupData[k] = { value: data._id , label: data.group_name} )
          
        });
        return groupData;
      }

      
  //   export async function getAgentID () {
  //   const warrooms = new Warroom();
  //   const clientInfo = await warrooms.getClientInformation()
  //   return clientInfo;
  // }
  export async function makeId(length:Number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


export const getAgentId = ()=>{
  
  return new Promise<AgentInterface> (resolve=>{
    resolve({
        agent_id:"3111"
      })
  })


}


export const uploadFileToS3 = async (files:any,filename:string) => {
    /* Import s3 config object and call the constrcutor */
    const s3 = await new ReactS3Client(s3Config);

    /* You can use the default directory defined in s3Config object
    * Or you can a define custom directory to upload when calling the
    * constructor using js/ts object destructuring.
    * 
    * const s3 = new ReactS3Client({
    *      ...s3Config,
    *      dirName: 'custom-directory'
    * });
    * 
    */

    try {
        const res = await s3.uploadFile(files[0],filename);
        console.log(filename)
        return res
        /*
        * {
        *   Response: {
        *     bucket: "bucket-name",
        *     key: "directory-name/filename-to-be-uploaded",
        *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
        *   }
        * }
        */
    } catch (exception) {
        console.log(exception);
        /* handle the exception */
    }
}

export function checkAgentId(){
  if (localStorage.getItem('agent_id') !== null) {
    return true
} else {
  return false;
}
}
