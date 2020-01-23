import React from 'react';

function Footer(props) {
  return (
    <footer>
      <span onClick={() => props.handleIteration()} className={`${!Object.keys(props.prevState).length || props.showPrevState ? 'disabled' : ''}`}>↩︎</span>
      <span onClick={() => props.handleIteration()} className={`${!Object.keys(props.prevState).length || !props.showPrevState ? 'disabled' : ''}`}>↪</span>
    </footer>
  );
}

export default Footer;
