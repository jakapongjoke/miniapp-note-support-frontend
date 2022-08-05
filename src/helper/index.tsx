import axios from 'axios';
import Warroom from 'sdk';
import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from '_config/uploadFile';
import { AnyMxRecord } from 'dns';
import { promises } from 'stream';
const short = require('short-uuid');
const translator = short().uuid(); // Defaults to flickrBase58

window.Buffer = window.Buffer || require("buffer").Buffer;
// export default axios.create({
//     baseURL:process.env.REACT_APP_API_URL
// });http://139.59.238.201/api/note-item/all/
const url = "https://note.wscdn.online/api/note-group/120"
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function getData(url: string) {

    return await axios.get(url).then((resp:any) => {
      return resp.data;
    });
  }

  export async function groupData(url: string) {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      let groupData = new Array();
      await axios.get(url).then((resp:any) => {
        resp.data.map((data:any,k:number)=> groupData[k] = { _id: data._id , group_name: data.group_name,group_color:data.group_color} )
      });
      return groupData;
    }

  //   export async function getAgentID () {
  //   const warrooms = new Warroom();
  //   const clientInfo = await warrooms.getClientInformation()
  //   return clientInfo;
  // }


export async function getAgentId(){
  return new Promise (resolve=>{
    setTimeout(()=>{
      resolve({
        agent_id:20
      })
    },100)
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