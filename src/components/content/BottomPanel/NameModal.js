import React, { useEffect } from 'react'

export default function NameModal({ saveScale, setName, showModal, closeModal }) {
  const handleModalClick = e => {
    const parent = document.querySelectorAll(".scale-name-modal")[0];

    if (parent && !parent.contains(e.target) && !e.target.classList.contains("save-scale"))
      closeModal();
  };

  useEffect(() => {
    window.addEventListener("click", handleModalClick);
  }, []);
  
  return (
    <div className={`scale-name-modal${showModal ? ' show-modal' : ''}`}>
      <form onSubmit={saveScale}>
        <label htmlFor='scale-name'>Enter Scale Name</label>
        <input
          type='text'
          name='scale-name'
          onChange={e => setName(e.target.value)}
        />
        <input type='submit' value="Save Scale" />
      </form>
    </div>
  );
}
