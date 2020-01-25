import React from 'react';
import { notes, scales } from '../../../data'

function CompatibleScale(props) {
  const { root, name, selectCompatibleScale, scaleFromCurrentRoot } = props;
  return (
    <li
      className="compatible-scale"
      onClick={() => selectCompatibleScale(root, name)}
      title={
        scaleFromCurrentRoot(scales[name], Object.values(notes).indexOf(root)).map(idx => notes[idx]).join('  ')
      }
    >
      {
        `${root} ${name}`
      }
    </li>
  );
}

export default CompatibleScale;
