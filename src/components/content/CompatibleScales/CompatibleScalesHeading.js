import React from "react";

export default function CompatibleScalesHeading({
  compatibleScales,
  showScale,
  selectedKey,
  selectedScale
}) {
  return (
    <span className="compatible-scales-heading">
      <span className="compatible-scales-count">
        {compatibleScales.flat().length}
      </span>
      &nbsp;
      {showScale
        ? `Scales Compatible With ${selectedKey} ${selectedScale}`
        : "Compatible Scales"}
    </span>
  );
}
