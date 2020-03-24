import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchFavs } from '../../../utils/HelperMethods';

export default function Favorites({ show, closeModal, handleSelectFavorite }) {
  const [ favs, setFavs ] = useState({ favs: [] });

  useEffect(() => {
    const handleModalClick = e => {
      const parent = document.querySelectorAll(".favorites-modal")[0];
      if (e.target.className === 'favorite' || (parent && !parent.contains(e.target) && e.target.id !== "favorites"))
        closeModal();
    };

    window.addEventListener("click", handleModalClick);

    fetchFavs(setFavs);
  }, [closeModal])

  return (
    <div
      id='favorites-modal'
      className={`modal favorites-modal${show ? " show-modal" : ""}`}
    >
      <ul>
        {favs.length
          ? favs.map(fav => (
              <li key={fav._id} className="favorite" onClick={() => handleSelectFavorite(fav.name, fav.notes)}>
                {fav.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
