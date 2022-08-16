import  React from "react"
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import {SelectOption,SelectProps} from "types/SelectType"

const Select = ({ options, onChange }: SelectProps) => {
    return (
      <select onChange={(e) => onChange(e)}>

        {options.map((option,k) => (
          <option key={k} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>
      
    );
  };


const SelectListGroupComponent: React.FC<SelectProps> = (props: SelectProps)=>{
    
    return (
    <>
      <Select options={props.options} onChange={props.onChange} />
    </>
    )
}

export default SelectListGroupComponent;