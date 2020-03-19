import React from 'react';  

export default function ActiveGroup({showGroup, groupName}) {
  return <span id="active-group" className={`user-option${!showGroup ? ' disabled' : ''}`}>{groupName}</span>;
}