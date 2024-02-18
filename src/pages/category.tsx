import React, { useState, useRef } from 'react';

export interface Option {
  id: number;
  name: string;
}
export interface MultiSelectTextBoxProps {
    options: Option[];
    selectedOptions: Option[];
    onSelectedOptionsChange: (newSelectedOptions: Option[]) => void;
  }
export const MultiSelectTextBox: React.FC<{ options: Option[] }> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleListBox = () => {
    setIsOpen(!isOpen);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const selectOption = (option: Option) => {
    setSelectedOptions([...selectedOptions, option]);
    setFilterText('');
    setIsOpen(false);
  };

  const removeOption = (option: Option) => {
    setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption.id !== option.id));
  };

  const filterOptions = (text: string) => {
    return options.filter(option => option.name.toLowerCase().includes(text.toLowerCase()));
  };

  // Concatenate the names of selected options
  const selectedValues = selectedOptions.map(option => option.name).join(', ');

  return (
    <div className="multi-select-textbox">
      <input
        type="text"
        value={selectedValues} // Display selected values in the input
        onClick={toggleListBox}
        onChange={(e) => {
          setSelectedOptions(e.target.value.split(',').map((name: string) => ({ id: -1, name: name.trim() })));
        }}
        ref={inputRef}
      />
      {isOpen && (
        <div className="options">
          {filterOptions(filterText).map(option => (
            <div key={option.id} onClick={() => selectOption(option)}>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage:
export const options: Option[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];

const Category: React.FC = () => {
  return (
    <div>      
      <MultiSelectTextBox options={options} />
    </div>
  );
};



export default Category;
