import React from 'react';
import { notes, scales } from '../../../data'

function CompatibleScale({
  root,
  name,
  selectCompatibleScale,
  scaleFromCurrentRoot
}) {
  return (
    <li
      className='compatible-scale'
      onClick={() => selectCompatibleScale(root, name)}
      title={scaleFromCurrentRoot(
        scales[name],
        Object.values(notes).indexOf(root)
      )
        .map(idx => notes[idx])
        .join("  ")}
    >
      <span>{`${root} ${name}`}</span>
    </li>
  );
}

export default CompatibleScale;
