import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Groups({ show, closeModal }) {
  const [groups, setGroups] = useState({ groups: [] });

  const handleModalClick = e => {
    const parent = document.querySelectorAll(".groups-modal")[0];
    if (parent && !parent.contains(e.target) && e.target.id !== "groups")
      closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/api/groups", {
        headers: {
          "auth-token": localStorage.authToken
        }
      });

      setGroups(result.data);
    };

    window.addEventListener("click", handleModalClick);

    fetchData();
  }, []);

  return (
    <div
      id='groups-modal'
      className={`modal groups-modal${show ? " show-modal" : ""}`}
    >
      <ul>
        {groups.length
          ? groups.map(group => (
              <li key={group._id} onClick={() => console.log("groupafsfsf")}>
                {group.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
