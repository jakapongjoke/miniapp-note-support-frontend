import  React from "react"
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import {SelectOption,SelectProps} from "types/SelectType"
const options = [
    { value: '1', label: 'all group' },
    { value: '2', label: 'Customer Group' },
    { value: '3', label: 'Testing Note Group' }
];

const Select = ({ options, onChange }: SelectProps) => {
    return (
      <select onChange={(e) => onChange(e.target.value)}>

        {options.map((option,k) => (
          <option key={k} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>
      
    );
  };
  const onSelectChange = (e:any) => {
    console.log(e.target.value)
  };

const FilterComponent: React.FC<SelectProps> = (props: SelectProps)=>{
    
    return (
    <>
      <Select options={props.options} onChange={props.onChange} />
    </>
    )
}

export default FilterComponent;