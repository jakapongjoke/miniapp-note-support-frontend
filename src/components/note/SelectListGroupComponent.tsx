import  React from "react"
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import {SelectOption,SelectEditProps} from "types/SelectType"

const Select = ({ options, onChange,currentGroup }: SelectEditProps) => {
    return (
      <select onChange={(e) => onChange(e)} value={currentGroup}>
        <option value="">Select Group</option>
        {options.map((option,k) => (
             <option key={k} value={option.value}>
          
                {option.label}
              </option>
        )
        
        )}

      </select>
      
    );
  };


const SelectListGroupComponent: React.FC<SelectEditProps> = (props: SelectEditProps)=>{
    
    return (
    <>
      <Select options={props.options} onChange={props.onChange} currentGroup={props.currentGroup} />
    </>
    )
}

export default SelectListGroupComponent;