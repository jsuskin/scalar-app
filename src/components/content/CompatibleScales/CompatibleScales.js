import React from 'react';
import CompatibleScale from './CompatibleScale';
import { notes, scales } from '../../../data'

function CompatibleScales(props) {
  const {
    showScale,
    selectedScale,
    selectedKey,
    selectedNoteIndices,
    selectCompatibleScale
  } = props;

  const scaleNames = Object.keys(scales);

  const removeErroneous = scaleName => {
    return ['Chromatic', 'None']
      .every(selection => scaleName !== selection)
  }

  // [[0,2,4,...], [1,3,5,...], [2,4,6,...],...]
  const scaleFromCurrentRoot = (scale, step) => {
    return scale.map(idx => {
      return idx + step < 12 ? idx + step : idx + step - 12;
    })
    //.sort((a, b) => a - b)
  }

  const compatibleScales =
    scaleNames.filter(removeErroneous)
    .map(scaleName => {  // ex: 'Major Scale'
      const scaleFromA = scales[scaleName];  // ex: [0,2,4,5,7,9,11]

      // [0,1,2,3,4,5,6,7,8,9,10,11]
      const everyKey = Array.from(Array(12)).map((x, step) => {
        return {
          name: scaleName,
          root: notes[step],
          arr: scaleFromCurrentRoot(scaleFromA, step)
        }
      });

      const matchingKeys = everyKey.filter(obj => {
        const scaleFromRoot = scaleFromCurrentRoot(
          showScale ? scales[selectedScale] : selectedNoteIndices.map(arr => arr[0]),
          Object.values(notes).indexOf(selectedKey)
        );

        const rootScaleHasCurrentScale = obj.arr.every(idx => scaleFromRoot.includes(idx));

        const currentScaleHasRootScale = scaleFromRoot.every(idx => obj.arr.includes(idx));

        return rootScaleHasCurrentScale || currentScaleHasRootScale;
      });

      return matchingKeys;

    })
      .filter(arr => arr.length)
      .map(arr => {
        return arr
          .filter(obj => {
            return !(obj.name === selectedScale && obj.root === selectedKey)
          });
      });

  return (
    <div className={`compatible-scales-container${showScale || selectedNoteIndices.length > 1 ? ' show-matching-scales' : ''}`}>
      <span className="compatible-scales-heading">
        <span className="compatible-scales-count">
          {compatibleScales.flat().length}
        </span>
        &nbsp;
        {showScale ? `Scales Compatible With ${selectedKey} ${selectedScale}` : 'Compatible Scales'}
      </span>
      <ul className="compatible-scales">
        {
          compatibleScales.map(arr => arr.map(obj => {
            return (
              <CompatibleScale
                key={`${obj.root} ${obj.name}`}
                {...obj}
                selectCompatibleScale={selectCompatibleScale}
                scaleFromCurrentRoot={scaleFromCurrentRoot}
              />
            );
          }))
        }
      </ul>
    </div>
  );
}

export default CompatibleScales;
