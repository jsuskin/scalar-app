import React, { useState } from 'react';
import CompatibleScale from './CompatibleScale';
import CompatibleScalesHeading from './CompatibleScalesHeading';
import MoreScalesBtn from './MoreScalesBtn';
import { scales } from '../../../data';
import { compatibleScales } from "../../../utils/HelperMethods";

function CompatibleScales({
  showScale,
  selectedScale,
  selectedKey,
  selectedNoteIndices,
  selectCompatibleScale
}) {
  const [ displayMultiplier, setDisplayMultiplier ] = useState(0);

  const scaleNames = Object.keys(scales);

  // [[0,2,4,...], [1,3,5,...], [2,4,6,...],...]
  const scaleFromCurrentRoot = (scale, step) => {
    return scale.map(idx => {
      return idx + step < 12 ? idx + step : idx + step - 12;
    });
    //.sort((a, b) => a - b)
  };
  
  const compatibleScalesList = compatibleScales(
    scaleNames,
    scaleFromCurrentRoot,
    showScale,
    selectedScale,
    selectedKey,
    selectedNoteIndices
  );

  const scaleComponents = compatibleScalesList.map(arr =>
    arr.map(obj => {
      return (
        <CompatibleScale
          key={`${obj.root} ${obj.name}`}
          {...obj}
          selectCompatibleScale={selectCompatibleScale}
          scaleFromCurrentRoot={scaleFromCurrentRoot}
        />
      );
    })
  );

  const showMoreScales = val => setDisplayMultiplier(displayMultiplier + val)
  
  return (
    <div
      className={`compatible-scales-container${
        showScale || selectedNoteIndices.length > 1
          ? " show-matching-scales"
          : ""
      }`}
    >
      <CompatibleScalesHeading
        compatibleScales={compatibleScalesList}
        showScale={showScale}
        selectedKey={selectedKey}
        selectedScale={selectedScale}
      />
      <ul className="compatible-scales">
        <MoreScalesBtn dir="prev" showMoreScales={showMoreScales} disabled={displayMultiplier < 1} />
        {scaleComponents.flat().slice(12 * displayMultiplier, 12 * (displayMultiplier + 1))}
        <MoreScalesBtn dir="next" showMoreScales={showMoreScales} disabled={scaleComponents.flat().length <= (displayMultiplier + 1) * 12} />
      </ul>
    </div>
  );
}

export default CompatibleScales;
