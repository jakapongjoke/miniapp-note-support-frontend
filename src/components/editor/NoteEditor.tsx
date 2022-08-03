import { useEffect, useState,useRef } from "react"
import { getData,groupData,uploadFileToS3 } from "helper";
import iconAddImage from 'images/add_image_icon.png'
import parse from 'html-react-parser';
import { v4 as uuidv4 } from 'uuid';
import { RootStore,Store } from 'redux/store';
import {useDispatch,useSelector} from 'react-redux'
import {UpdateImageNoteEditor} from 'redux/actions/noteAction'
interface NoteEditorProps{
    content:any,
}

const blurHandler = (e:any)=>{
    console.log(e)
}

const mouseUpHandler = (e:any)=>{
    // console.log(e)
}






const onChangeHandler = (e:any)=>{
    console.log(e)
}

//  const onClickHandler = async (e:any)=>{
//         console.log("click")
//         console.log(document.getSelection())
//         console.log(document.getSelection()?.focusOffset)
//     }

 const mouseDownHandler = async (e:any)=>{
        // console.log(document.getSelection())
        // console.log(document.getSelection()?.focusOffset)
    }


const NoteEditor: React.FC<NoteEditorProps> = (props: NoteEditorProps)=>{
    const dispatch = useDispatch();

    const note = useSelector((state:RootStore) => state.note.data)




    const [selection,SetSelection] = useState<Selection>()
    const [position,SetPosition] = useState<Number>(0)
    const [noteDescription,setNoteDescription] = useState<String>("")
    const descriptionValue = useRef("")
    descriptionValue.current = props.content
    const mouseClickPosition = useRef(0)

    const onClickHandler = async (e:any)=>{
        
        mouseClickPosition.current = document.getSelection()?.focusOffset||0

    }

    const onKeyDown = async (e:any)=>{
        descriptionValue.current = e.target.value
    }

    const onKeyUp = async (e:any)=>{
        descriptionValue.current = e.target.value
    }

   function getTxtByRange (startNum:number= 0,endNum:number=0,str:String){
        let textEnd = "";
        console.log("startNum+ " + startNum)
        console.log("endNum+ " +endNum)
        for(let i=startNum; i <endNum ; i++){
            textEnd += `${str[i]}`

        }
        console.log(textEnd)
        return textEnd;
    }


    const updateImgToEditor = async (files:any,currentPosition:number,targetSelector:any)=>{
        console.log("updateImgToEditor")
        console.log(currentPosition)
        const filename = await uuidv4();
        const uploadFile = await uploadFileToS3(files,filename);

        let currentText = ""
        let textRangeEnd;
        let newText = ""
        let img = ""
        if(typeof uploadFile !== undefined){
            const location =  await uploadFile?.location;
            currentText = descriptionValue.current
        
            let textRange =   currentText.substring(0,currentPosition)
            
            const total = currentText.length-currentPosition
            let i:Number;

       
            
            
            // currentText.substring(total,currentText.length)
            // // textRangeEnd =   currentText.substring(positionInject,currentText.length)

             img = `<div style="width:200px; display:block;"><img style="width:100%" src="${location}"/></div>`
             let toEndNum = currentText.length-currentPosition
             let textEnd =  getTxtByRange(currentPosition,currentText.length,currentText);
            newText = textRange+img+textEnd

            dispatch(UpdateImageNoteEditor(newText))
            
        }else{

            console.log("undefined")
        }
      
      }
      


    
// useEffect(()=>{
//     (async()=>{
//         const d = await document.getSelection();
//         SetSelection(e);

//     }
//     )()
// },[])
   

return (
<>

<div className="note_description" contentEditable="true" 
onBlur={(e)=>{blurHandler(e)} }  
onMouseDown={(e)=>{ mouseDownHandler(e)}}  
onMouseUp={(e)=>{ mouseUpHandler(e) }}  
onChange={(e)=>{onChangeHandler(e) }}
onClick={(e)=>{onClickHandler(e)}}
onKeyDown={(e)=> { onKeyDown(e) } }
onKeyUp={(e)=> { onKeyUp(e) } }
suppressContentEditableWarning={true}>
    
    {parse(note.description.toString())}
    </div>

    <div className="file_area">
<label id="getFileLabel" htmlFor="getFile">
  <img src={iconAddImage} />

</label>
<input type="file" id="getFile" onChange={(e)=>{ 
    
    updateImgToEditor(e.target.files,mouseClickPosition.current,e.target)

}

    }   />
</div>
</>
)





}
export default NoteEditor;