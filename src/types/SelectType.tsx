export type SelectOption = {
    value: string;
    label: string;
  };
  
  export type SelectProps = {
    options: SelectOption[];
    onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;

  };