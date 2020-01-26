import React from 'react';

function Select(props) {
  const {
    selectionType,
    selectionName,
    selectionValue,
    handleChange,
    arr,
    func
  } = props;

  return (
    <div className={`${selectionType}-select`}>
      <label htmlFor={`${selectionType}-select`}>
        {selectionType.charAt(0).toUpperCase() + selectionType.slice(1)}
      </label>
      <select
        id={`${selectionType}-select`}
        name={selectionName}
        value={selectionValue}
        onChange={handleChange}
      >
        {arr.map(func)}
      </select>
    </div>
  );
}

export default Select;
