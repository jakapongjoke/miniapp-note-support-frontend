

export const editorKeyUp = (e:any,cb:any ) =>{
   console.log('up')
 
  }
  
  
  export  const editorKeyDown = (e:any,cb:any) =>{
     console.log("editorKeyDown")
    // setnoteDescription(e.target.value)
  }
  
  export  const editorOnChange = (e:any,cb:any) =>{

     if(typeof cb !== undefined){
      return cb()
     }
    // setnoteDescription(e.target.value)
  }
  