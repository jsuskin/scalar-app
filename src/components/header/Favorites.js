import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Favorites({ show, closeModal }) {
  const [ favs, setFavs ] = useState({ favs: [] });

  const handleModalClick = e => {
    const parent = document.querySelectorAll('.favorites-modal')[0];
    if(parent && !parent.contains(e.target) && e.target.id !== 'favorites') closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/api/favorites", {
        headers: {
          "auth-token": localStorage.authToken
        }
      });

      setFavs(result.data);
    }

    window.addEventListener("click", handleModalClick);

    fetchData();
  }, [])

  return (
    <div
      id='favorites-modal'
      className={`modal favorites-modal${show ? " show-modal" : ""}`}
    >
      <ul>
        {favs.length
          ? favs.map(fav => (
              <li key={fav._id} onClick={() => console.log("favafsfsf")}>
                {fav.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
