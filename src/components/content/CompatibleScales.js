import React, { Component } from 'react';
import { notes, scales } from '../../data'

class CompatibleScales extends Component {

  render() {

    const {
      showScale,
      selectedScale,
      selectedKey,
      selectedNoteIndices,
      handleSwitchScale
    } = this.props;

    const scaleNames = Object.keys(scales);

    const removeErroneous = scaleName => {
      return [selectedScale, 'Chromatic', 'None']
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

          return obj.arr.every(idx => {
            return scaleFromRoot.includes(idx);
          }) || scaleFromRoot.every(idx => {
            return obj.arr.includes(idx);
          });
        });

        return matchingKeys;

      }).filter(arr => arr.length)

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
                <li
                  key={`${obj.root} ${obj.name}`}
                  className="compatible-scale"
                  onClick={() => handleSwitchScale(obj.root, obj.name)}
                  title={
                    scaleFromCurrentRoot(scales[obj.name], Object.values(notes).indexOf(obj.root)).map(idx => notes[idx])
                  }
                >
                  {
                    `${obj.root} ${obj.name}`
                  }
                </li>
              );
            }))
          }
        </ul>
      </div>
    );
  }

}

export default CompatibleScales;
