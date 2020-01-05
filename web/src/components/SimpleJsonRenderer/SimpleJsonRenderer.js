import React from 'react';

import './SimpleJsonRenderer.css';

// Simple renderer because it can only render a 'flat' JSON
// meaning a max depth of 1
function SimpleJsonRenderer({ json }) {
  const renderLine = (key, value) => (
    <h6 key={key}>
      <b>{`${key}: `}</b>
      {json[key]}
    </h6>
  );

  return (
    <div className="SimpleJsonRenderer">
      {Object.keys(json).map(key => renderLine(key, json[key]))}
    </div>
  );
}

export default SimpleJsonRenderer;
