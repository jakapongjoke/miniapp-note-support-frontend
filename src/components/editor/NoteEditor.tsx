import { useEffect, useState,useRef } from "react"
import { getData,groupData,uploadFileToS3 } from "helper";
import iconAddImage from 'images/add_image_icon.png'
import parse from 'html-react-parser';
import { v4 as uuidv4 } from 'uuid';
import { RootStore,Store } from 'redux/store';
import {useDispatch,useSelector} from 'react-redux'
import {UpdateImageNoteEditor} from 'redux/actions/noteAction'
import {contentEditableProps} from 'types/editorType'
import ContentEditable from "react-contenteditable";

interface NoteEditorProps{
    content:any,
}



const NoteEditor: React.FC<contentEditableProps> = (props: contentEditableProps)=>{
    const dispatch = useDispatch();

    const note = useSelector((state:RootStore) => state.note.data)

    



    const [selection,SetSelection] = useState<Selection>()
    const [position,SetPosition] = useState<Number>(0)
    const [noteDescription,setNoteDescription] = useState<String>("")

    const descriptionValue = useRef("")

    const mouseClickPosition = useRef(0)
    const mouseClickTxtSelection = useRef("")





    const onClickHandler = async (e:any)=>{
        
        mouseClickPosition.current = document.getSelection()?.focusOffset||0
        mouseClickTxtSelection.current = document.getSelection()?.focusNode?.textContent||""
console.log(document.getSelection())
console.log(mouseClickTxtSelection.current)

    }

    
    
    
    
    
    
    const onChangeHandler = (e:any)=>{
             setNoteDescription(e.target.value)

    }
    


    const onKeyDown = async (e:any)=>{
        // setNoteDescription(e.target.value)
    }

    const onKeyUp = async (e:any)=>{
        // setNoteDescription(e.target.value)
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

        let currentText:String = ""
        let textRangeEnd;
        let newText = ""
        let img = ""
        if(typeof uploadFile !== undefined){
            const location =  await uploadFile?.location;
            currentText = noteDescription
        
            let textRange =   currentText.substring(0,currentPosition)
            
            const total = currentText.length-currentPosition
            let i:Number;

       
            
            
            // currentText.substring(total,currentText.length)
            // // textRangeEnd =   currentText.substring(positionInject,currentText.length)

             img = `<div style="width:200px; display:block;"><img style="width:100%" src="${location}"/></div>`
             let toEndNum = currentText.length-currentPosition
             let textEnd =  getTxtByRange(currentPosition,currentText.length,currentText);
            newText = textRange+img+textEnd
            console.log(textRange)
            // dispatch(UpdateImageNoteEditor(newText))
            setNoteDescription(newText)
        }else{

            console.log("undefined")
        }
      
      }
      


useEffect(()=>{
    (async () => {
        setNoteDescription(props.content);
        console.log('aa')
        console.log(noteDescription?.toString())
     })();

},[noteDescription])
 

return (
<>
<ContentEditable className="note_description" id="description" 
        html={"<P>sss</P>"} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={props.onChange} // handle innerHTML change
        
      />

{/* 
<div className="note_description" contentEditable="true" id="description"
suppressContentEditableWarning={true} 

onKeyUp={props.onKeyUp}
{parse(props.content.toString())}


>

    </div> */}

    <div className="file_area">
<label id="getFileLabel" htmlFor="getFile">
  <img src={iconAddImage} />

</label>
<input type="file" id="getFile" 

onChange={(e)=>{ 
    
    updateImgToEditor(e.target.files,mouseClickPosition.current,e.target)

}

    }   />
</div>
</>
)





}
export default NoteEditor;