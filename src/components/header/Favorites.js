import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Favorites({ show, closeModal, handleSelectFavorite }) {
  const [ favs, setFavs ] = useState({ favs: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/api/favorites", {
        headers: {
          "auth-token": localStorage.authToken
        }
      });

      setFavs(result.data);
    }

    const handleModalClick = e => {
      const parent = document.querySelectorAll(".favorites-modal")[0];
      if (e.target.className === 'favorite' || (parent && !parent.contains(e.target) && e.target.id !== "favorites"))
        closeModal();
    };

    window.addEventListener("click", handleModalClick);

    fetchData();
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
