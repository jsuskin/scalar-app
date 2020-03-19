import React, { useEffect } from 'react'

export default function SaveFavModal({ saveScale, name, setName, showModal, closeModal }) {
  useEffect(() => {
    const handleModalClick = e => {
      const parent = document.querySelectorAll(".scale-name-modal")[0];

      if (
        parent &&
        !parent.contains(e.target) &&
        !e.target.classList.contains("save-scale")
      ) {
        closeModal();
        setName('');
      }
    };

    window.addEventListener("click", handleModalClick);
  }, [closeModal, setName]);

  // console.log(name)
  
  return (
    <div className={`scale-name-modal${showModal ? ' show-modal' : ''}`}>
      <form onSubmit={saveScale}>
        <label htmlFor='scale-name'>Enter Scale Name</label>
        <input
          type='text'
          name='scale-name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input type='submit' className="submit" value="Save Scale" />
      </form>
      <span className="save-modal-note">
        All currently displayed notes will be saved to your favorites{name ? ` as ${name}` : ''}.
      </span>
    </div>
  );
}
