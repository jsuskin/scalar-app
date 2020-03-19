import React from 'react';

function SchemeSelector(props) {
  const themes = [
    'pink',
    'blue',
    'green',
    'yellow',
    'brown',
    'white'
  ];

  return (
    <div className="scheme-selection-container">
      <ul className="scheme-selector">
        {
          themes
            .filter(color => color !== props.colorScheme)
            .map(color => {
              return (
                <li key={color} className="user-option">
                  <span
                    className={`color-selection ${color}`}
                    onClick={() => props.handleChangeColorScheme(color)}
                  ></span>
                </li>
              );
            })
        }
      </ul>
    </div>
  );
}

export default SchemeSelector;
