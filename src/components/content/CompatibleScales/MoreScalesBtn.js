import React from "react";

export default function MoreScalesBtn({ dir, showMoreScales, disabled }) {
  return (
    <div
      className={`show-more-scales ${disabled ? 'disabled ' : ''}${dir}`}
      onClick={() => showMoreScales(dir === "next" ? 1 : -1)}
    >
      <span>{dir === "prev" ? "◄" : "►"}</span>
    </div>
  );
}
