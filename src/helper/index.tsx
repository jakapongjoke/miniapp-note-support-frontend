import axios from 'axios';




// export default axios.create({
//     baseURL:process.env.REACT_APP_API_URL
// });
const url = "http://localhost:8070/api/note-group/120"
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
        resp.data.map((data:any,k:number)=> groupData[k] = { value: data._id , label: data.group_name} )
      });
      return groupData;
    }
